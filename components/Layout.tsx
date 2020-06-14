import Head from 'next/head';
import { ReactNode } from 'react';
import { Heading, Box, Flex, Stack, Spinner } from '@chakra-ui/core';
import { Menu, MenuItem } from '../components/Menu';
import { UserLogout } from '../components/UserLogout';
import { FeedItemProps } from './Feed';
import { News } from '../components/News';
import { TweetModal } from './Tweet';
import colors from '../utils/colors';
import { useSeed, useAppUser, useFeed } from '../utils/hooks';
import { TIMELINE_KEY } from '../utils/constants';

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <Flex direction='row' justifyContent='center'>
      <Stack direction='column' display={['none', 'block']} marginLeft={3}>
        <Box marginRight={55}>
          <Menu />
          <TweetModal />
          <Box pos='fixed' bottom={0}>
            <UserLogout/>
          </Box>
        </Box>
      </Stack>
      <Flex justifyContent='center'>
        <Box maxWidth={900}>
          <Head>
            <title>Social Media</title>
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <header>
            <Heading as='h2' color={colors.text}>
              Social Media
            </Heading>
          </header>
          <main>{children}</main>
        </Box>
      </Flex>
      <News />
    </Flex>
  );
}
