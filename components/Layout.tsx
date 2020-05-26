import Head from 'next/head';
import { PropsWithChildren } from 'react';
import { Heading, Box, Flex, Button, Icon } from '@chakra-ui/core';
import { Menu, MenuItem } from '../components/Menu';

type LayoutProps = {};

export function Layout(props: PropsWithChildren<LayoutProps>) {
  return (
    <Flex direction='row' justifyContent='center'>
      <Menu>
        <MenuItem
          icon={<Icon name='star' color='white' />}
          text='Home'
          link='/'
        />
        <MenuItem
          icon={<Icon name='search' color='white' />}
          text='Explore'
          link='/explore'
        />
        <MenuItem
          icon={<Icon name='info' color='white' />}
          text='Notifications'
          link='/notifications'
        />
        <MenuItem
          icon={<Icon name='email' color='white' />}
          text='Messages'
          link='/messages'
        />
        <MenuItem
          icon={<Icon name='plus-square' color='white' />}
          text='Lists'
          link='/lists'
        />
        <MenuItem
          icon={<Icon name='view' color='white' />}
          text='Profile'
          link='/profile'
        />
        <MenuItem
          icon={<Icon name='question' color='white' />}
          text='More'
          link='/more'
        />
        <Button variantColor='blue' variant='solid' marginTop={10}>
          Tweet
        </Button>
      </Menu>
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
          <main>{props.children}</main>
        </Box>
      </Flex>
    </Flex>
  );
}
