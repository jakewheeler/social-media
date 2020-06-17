import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import axios from 'axios';
import colors from '../utils/colors';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url) => axios.get(url).then((resp) => resp.data),
        revalidateOnFocus: false,
        dedupingInterval: 10000,
      }}
    >
      <ThemeProvider>
        <CSSReset />
        <Component {...pageProps} />
        <style jsx global>{`
          html {
            background: ${colors.bg};
            font-family: Helvetica;
          }
        `}</style>
      </ThemeProvider>
    </SWRConfig>
  );
}
