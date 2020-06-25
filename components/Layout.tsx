import Head from 'next/head';
import { ReactNode } from 'react';
import { Box, Flex, Stack } from '@chakra-ui/core';
import { Menu } from '../components/Menu';
import { UserLogout } from '../components/UserLogout';
import { News } from '../components/News';
import { TweetModal } from './Tweet';
type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <Flex direction='row' justifyContent='center' margin='0 auto' maxW={1200}>
      <Stack direction='column' display={['none', 'block']} marginLeft={3}>
        <Box marginRight={55}>
          <Menu />
          <TweetModal />
          <Box pos='fixed' bottom={0}>
            <UserLogout />
          </Box>
        </Box>
      </Stack>
      <Flex justifyContent='center' flexBasis={'100%'}>
        <Box flexBasis='inherit'>
          <Head>
            <title>Social Media</title>
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <main>{children}</main>
        </Box>
      </Flex>
      <News />
    </Flex>
  );
}
