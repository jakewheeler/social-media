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
    <Flex
      className='flex-container'
      justifyContent='center'
      margin='0 auto'
      maxW={1200}
      border='solid red'
    >
      <Stack
        className='menu-stack'
        direction='column'
        display={['none', 'block']}
        flex={1}
        border='solid red'
        overflow='hidden'
      >
        <Menu />
        <TweetModal />
        <Box pos='fixed' bottom={0}>
          <UserLogout />
        </Box>
      </Stack>
      <Box flex={3} overflow='auto'>
        <Head>
          <title>Social Media</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Box className='overflow-container' overflowY='scroll'>
          <main>{children}</main>
        </Box>
      </Box>
      <Box flex={1} border='solid red' overflow='hidden'>
        <News />
      </Box>
    </Flex>
  );
}
