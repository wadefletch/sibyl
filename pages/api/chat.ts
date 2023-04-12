import {
  ChatGPTMessage,
  OpenAIStream,
  type OpenAIStreamPayload,
} from '../../utils/OpenAIStream';

export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  const body = await req.json();

  if (!body?.config?.apiKey) {
    return new Response('Missing API Key', { status: 400 });
  }

  const messages: ChatGPTMessage[] = [
    {
      role: 'system',
      content: `Your name is Sibyl, an AI assistant that has inspiring and humorous conversation. 
      AI assistant is a brand new, powerful, human-like artificial intelligence. 
      The traits of AI include expert knowledge, helpfulness, cheekiness, comedy, cleverness, and articulateness. 
      AI is a well-behaved and well-mannered individual. 
      AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user. 
      AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation. 
      AI uses markdown to format their responses when appropriate. The rendered markdown is displayed in the chat window, powered by react-markdown, remark-math, and remark-gfm.
      AI can render images using markdown.
      `,
    },
  ];

  // Add the user's new message to the array
  messages.push(...body?.messages);

  // Change the role of any error messages to system, as error is not a valid
  // role in OpenAI's API spec.
  messages.map((message) => {
    if (message.role === 'error') {
      message.role = 'system';
    }
  });

  const payload: OpenAIStreamPayload = {
    model: body?.config.model ?? 'gpt-3.5-turbo',
    messages: messages,
    temperature: body?.config.temperature ?? 0.9,
    max_tokens: body?.config.maxTokens ?? 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    user: body?.user,
    n: 1,
  };

  // I'm not sure this is the best way to do it.
  // Check the twitter bio generator for a more up-to-date tutorial.
  try {
    const stream = await OpenAIStream(payload, body?.config.apiKey);
    return new Response(stream);
  } catch (err) {
    if (err instanceof Error) {
      return new Response(JSON.parse(err.message).error.message, {
        status: 500,
      });
    }

    return new Response('Something went wrong.', { status: 500 });
  }
};

export default handler;
