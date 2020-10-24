import { ChakraProvider, extendTheme } from "@chakra-ui/core"
import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import axios from 'axios';
import colors from '../utils/colors';
import { TIMELINE_KEY } from '../utils/constants';
import { useState, useEffect } from 'react';
import { useStore } from '../utils/stores';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: `${colors.bg}`,
        fontFamily: 'Helvetica',
        overflowY: 'scroll'
      }
    }
  }
})

export default function App({ Component, pageProps }: AppProps) {
  const { json, fetch } = useStore();
  const [isFetched, setIsFetched] = useState(false);

  // initial feed data fetch
  useEffect(() => {
    if (!isFetched) {
      fetch(TIMELINE_KEY);
      setIsFetched(true);
    }
  }, [setIsFetched, json]);

  return (
    <SWRConfig
      value={{
        fetcher: (url) => axios.get(url).then((resp) => resp.data),
        revalidateOnFocus: false,
        dedupingInterval: 10000000,
      }}
    >
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SWRConfig>
  );
}
