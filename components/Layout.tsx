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
    <Flex className='main-container'  justifyContent={{base: 'flex-start', sm: 'center'}} mt={2}>
      <Flex
        className='layout-container'
        justifyContent='center'
        maxW={1200}
      >
        <Stack
          className='menu-stack'
          direction='column'
          display={['none', 'block']}
          flex={1}
          marginRight={55}
        >
          <Box position='fixed' marginLeft={5}>
            <Menu />
            <TweetModal />
            <Box pos='fixed' bottom={0}>
              <UserLogout />
            </Box>
          </Box>
        </Stack>
        <Box flex={3}>
          <Head>
            <title>Social Media</title>
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <main>{children}</main>
        </Box>
        <Box flex={1} display={['none', 'none', 'none', 'block']}>
          <Box position='fixed'>
            <News />
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}
