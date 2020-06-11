import Head from 'next/head';
import { PropsWithChildren } from 'react';
import { Heading, Box, Flex, Stack } from '@chakra-ui/core';
import { Menu, MenuItem } from '../components/Menu';
import { UserLogout } from '../components/UserLogout';
import { FeedItemProps } from './Feed';
import { News } from '../components/News';
import { TweetModal } from './Tweet';
import colors from '../utils/colors';

type LayoutProps = {
  user: FeedItemProps;
  tweets: FeedItemProps[] | undefined;
  timelineKey: string;
};

export function Layout(props: PropsWithChildren<LayoutProps>) {
  return (
    <Flex direction='row' justifyContent='center'>
      <Stack direction='column' display={['none', 'block']} marginLeft={3}>
        <Box marginRight={55}>
          <Menu />
          <TweetModal
            user={props.user}
            tweets={props.tweets}
            timelineKey={props.timelineKey}
          />
          <Box pos='fixed' bottom={0}>
            <UserLogout user={props.user} />
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
          <main>{props.children}</main>
        </Box>
      </Flex>
      <News />
    </Flex>
  );
}
