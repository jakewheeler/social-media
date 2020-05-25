import { Layout } from '../components/Layout';
import { Flex, Box } from '@chakra-ui/core';
import { Menu, MenuItem } from '../components/Menu';
import { Feed, FeedItem } from '../components/Feed';

export default function Index() {
  return (
    <Layout>
      <Flex direction='row'>
        <Box w='100%'>
          <Menu>
            <MenuItem text='Home' link='/' />
            <MenuItem text='Explore' link='/explore' />
            <MenuItem text='Notifications' link='/notifications' />
            <MenuItem text='Messages' link='/messages' />
            <MenuItem text='Lists' link='/lists' />
            <MenuItem text='Profile' link='/profile' />
            <MenuItem text='More' link='/more' />
          </Menu>
        </Box>
        <Box w='100%' overflow='scroll'>
          <Feed>
            <FeedItem name={'Jake'} handle={'@jake'} content={'some status'} />
            <FeedItem
              name={'Jake2'}
              handle={'@jake2'}
              content={'some status'}
            />
            <FeedItem
              name={'Jake2'}
              handle={'@jake2'}
              content={'some status'}
            />
            <FeedItem
              name={'Jake2'}
              handle={'@jake2'}
              content={'some status'}
            />
            <FeedItem
              name={'Jake2'}
              handle={'@jake2'}
              content={'some status'}
            />
          </Feed>
        </Box>
        <Box w='100%' bg='pink'>
          right
        </Box>
      </Flex>
      <style jsx global>{`
        html {
          background: #243447;
          font-family: Helvetica;
        }
      `}</style>
    </Layout>
  );
}
