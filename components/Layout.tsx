import Head from 'next/head';
import { PropsWithChildren } from 'react';
import { Heading, Box, Flex, Icon, Stack, Button } from '@chakra-ui/core';
import { Menu, MenuItem } from '../components/Menu';
import { UserLogout } from '../components/UserLogout';
import { FeedItemProps } from './Feed';
import { News } from '../components/News';
import { TweetModal } from './Tweet';

type LayoutProps = {
  user: FeedItemProps;
  tweets: FeedItemProps[] | undefined;
  timelineKey: string;
};

export function Layout(props: PropsWithChildren<LayoutProps>) {
  return (
    <Flex direction='row' justifyContent='center'>
      <Stack
        direction='column'
        display={['none', 'block', 'block', 'block']}
        marginLeft={3}
      >
        <Box marginRight={55}>
          <Menu>
            <MenuItem
              icon={<Icon name='star' color='white' />}
              text='Home'
              link='/'
            />
            <MenuItem
              icon={<Icon name='search' color='white' />}
              text='Explore'
              link='/'
            />
            <MenuItem
              icon={<Icon name='info' color='white' />}
              text='Notifications'
              link='/'
            />
            <MenuItem
              icon={<Icon name='email' color='white' />}
              text='Messages'
              link='/'
            />
            <MenuItem
              icon={<Icon name='plus-square' color='white' />}
              text='Lists'
              link='/'
            />
            <MenuItem
              icon={<Icon name='view' color='white' />}
              text='Profile'
              link='/'
            />
            <MenuItem
              icon={<Icon name='question' color='white' />}
              text='More'
              link='/'
            />
          </Menu>
          <TweetModal
            user={props.user}
            tweets={props.tweets}
            timelineKey={props.timelineKey}
          />
          <Box pos='fixed' bottom={0} alignSelf='center'>
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
            <Heading as='h2' color='white'>
              Social Media
            </Heading>
          </header>
          <main style={{ minWidth: '100%' }}>{props.children}</main>
        </Box>
      </Flex>
      <News />
    </Flex>
  );
}
