import { ChatGPTAgent } from '../utils/OpenAIStream';
import { classNames } from '../utils/classNames';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';

import 'katex/dist/katex.min.css';

export interface ChatMessageProps {
  role: ChatGPTAgent | 'error';
  content: string;
}

function ChatMessage({ role, content }: ChatMessageProps) {
  const name = {
    user: 'User',
    system: 'System',
    assistant: 'Sibyl',
    error: 'Error',
  };

  return (
    <div
      className={classNames(
        role === 'user' ? 'text-right' : 'text-left',
        'border-b p-5 dark:border-zinc-700 dark:text-zinc-100'
      )}
    >
      <p
        className={classNames(
          'mb-2 text-xs font-bold uppercase',
          role === 'error'
            ? 'text-red-600 dark:text-red-300'
            : 'text-emerald-600 dark:text-emerald-300'
        )}
      >
        {name[role]}
      </p>
      {role === 'user' ? (
        content
      ) : (
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex]}
          className={classNames(
            'message',
            role === 'error' && 'text-red-600 dark:text-red-300'
          )}
        >
          {content}
        </ReactMarkdown>
      )}
    </div>
  );
}

export default ChatMessage;
