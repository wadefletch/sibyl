import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';
import type { AppProps } from 'next/app';

import '../styles/tailwind.css';

const inter = Inter({ subsets: ['latin'] });

function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
      <Analytics />
    </main>
  );
}

export default App;
