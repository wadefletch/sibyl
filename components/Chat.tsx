import { useEffect, useRef, useState } from 'react';
import { type ChatGPTMessage } from '../utils/OpenAIStream';
import ChatInput from './ChatInput';
import Spinner from './Spinner';
import ChatMessage from './ChatMessage';
import { useCookies } from 'react-cookie';
import { useConfig } from './ConfigContext';

const COOKIE_NAME = 'sibyl-gpt-user-cookie';

function Chat() {
  const [messages, setMessages] = useState<ChatGPTMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [cookie, setCookie] = useCookies([COOKIE_NAME]);
  const { config } = useConfig();

  async function sendMessage(message: string) {
    setLoading(true);
    const newMessages = [
      ...messages,
      { role: 'user', content: message } as ChatGPTMessage,
    ];
    setMessages(newMessages);
    const last10messages = newMessages.slice(-10); // remember last 10 messages

    const body = {
      messages: last10messages,
      user: cookie[COOKIE_NAME],
      config,
    };

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const content = await response.text();
      setMessages([...newMessages, { role: 'error', content }]);
      setLoading(false);
      return;
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    let lastMessage = '';

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      lastMessage = lastMessage + chunkValue;

      setMessages([
        ...newMessages,
        { role: 'assistant', content: lastMessage },
      ]);
    }

    setLoading(false);
    return;
  }

  useEffect(() => {
    if (!messagesEndRef.current) return;
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, messagesEndRef]);

  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      // generate a semi random short id
      const randomId = Math.random().toString(36).substring(7);
      setCookie(COOKIE_NAME, randomId);
    }
  }, [cookie, setCookie]);

  return (
    <div className="relative flex h-full max-w-2xl flex-1 flex-col border dark:divide-zinc-700 dark:border-zinc-700">
      <div
        id="messages"
        className="flex-1 overflow-y-auto dark:[color-scheme:dark]"
      >
        {messages.map((message, index) => {
          return <ChatMessage key={index} {...message} />;
        })}
        <div ref={messagesEndRef} />
      </div>

      {loading && (
        <Spinner className="absolute bottom-4 right-4 text-zinc-400 dark:text-zinc-500" />
      )}

      <ChatInput
        value={input}
        autoComplete="off"
        className="inline-block w-full border-t p-3 text-xl focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-400"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && input.length > 0) {
            sendMessage(input);
            setInput('');
          }
        }}
      />
    </div>
  );
}

export default Chat;
