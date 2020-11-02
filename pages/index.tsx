import { Layout } from '../components/Layout';
import { Box } from '@chakra-ui/core';
import { Feed } from '../components/Feed';
import { Tweet } from '../components/Tweet';
import { GetStaticProps } from 'next';
import { createAppUser } from '../utils/helpers';
import { APP_USER_SEED } from '../utils/constants';
import { FeedItemProps } from '../types';

export const getStaticProps: GetStaticProps = async () => {
  const user = await createAppUser(APP_USER_SEED);

  return {
    props: {
      user,
    },
  };
};

type IndexProps = {
  user: FeedItemProps;
};

export default function Index({ user }: IndexProps) {
  return (
    <Layout user={user}>
      <Tweet />
      <Feed />
    </Layout>
  );
}
