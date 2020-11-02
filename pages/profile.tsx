import { Text, Avatar, Box, Heading, VStack } from '@chakra-ui/core';
import colors from '../utils/colors';
import { Layout } from '../components/Layout';
import { createFeedItem, fetchUserFromSeed } from '../utils/helpers';
import { APP_USER_SEED } from '../utils/constants';
import { FeedItemProps, User } from '../types';
import { GetStaticProps } from 'next';
import { Feed } from '../components/Feed';

export const getStaticProps: GetStaticProps = async () => {
  let user = await fetchUserFromSeed(APP_USER_SEED);
  const feedItem = await createFeedItem(user);

  return {
    props: {
      user,
      feedItem,
    },
  };
};

type ProfileProps = {
  user: User;
  feedItem: FeedItemProps;
};

export default function Profile({ user, feedItem }: ProfileProps) {
  return (
    <Layout user={feedItem}>
      <Box>
        <VStack
          alignItems='center'
          borderStyle='solid'
          borderColor={colors.border}
          borderWidth={1}
          padding={5}
          borderRadius={10}
        >
          <Avatar size='2xl' src={user.picture.large} />
          <Heading
            color={colors.text}
          >{`${user.name.first} ${user.name.last}`}</Heading>
          <Text color={colors.text}>{`@${user.login.username}`}</Text>
        </VStack>
      </Box>
      <Feed user={feedItem} isProfile />
    </Layout>
  );
}
