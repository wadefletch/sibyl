import Head from 'next/head';
import { ConfigProvider } from '../components/ConfigContext';
import Chat from '../components/Chat';
import Config from '../components/Config';

function ChatPage() {
  return (
    <ConfigProvider>
      <Head>
        <title>Sibyl</title>
      </Head>
      <div className="flex h-screen w-screen flex-col p-10 antialiased dark:bg-zinc-900 dark:text-zinc-100 md:flex-row">
        <Chat />
        <Config />
      </div>
    </ConfigProvider>
  );
}

export default ChatPage;
