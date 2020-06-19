import { Layout } from '../components/Layout';
import { Box } from '@chakra-ui/core';
import { Feed } from '../components/Feed';

export default function Index() {
  return (
    <Layout>
      <Box marginTop={10}>
        <Feed />
      </Box>
    </Layout>
  );
}
