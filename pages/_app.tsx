import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
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
  );
}
