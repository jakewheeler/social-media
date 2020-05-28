import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import axios from 'axios';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{ fetcher: (url) => axios.get(url).then((resp) => resp.data) }}
    >
      <ThemeProvider>
        <CSSReset />
        <Component {...pageProps} />
        <style jsx global>{`
          html {
            background: #243447;
            font-family: Helvetica;
          }
        `}</style>
      </ThemeProvider>
    </SWRConfig>
  );
}
