import { Layout } from '../components/Layout';
import { Box } from '@chakra-ui/core';
import { Feed } from '../components/Feed';
import { Tweet } from '../components/Tweet';

export default function Index() {
  return (
    <Layout>
        <Tweet />
        <Feed />
    </Layout>
  );
}
