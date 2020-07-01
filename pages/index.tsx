import { Layout } from '../components/Layout';
import { Box } from '@chakra-ui/core';
import { Feed } from '../components/Feed';
import { Tweet } from '../components/Tweet';

export default function Index() {
  return (
    <Layout>
      <Box className='main-content' marginTop={10}>
        <Tweet />
        <Feed />
      </Box>
    </Layout>
  );
}
