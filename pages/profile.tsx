import { Text, Avatar, Stack, Box, Heading } from '@chakra-ui/core';
import colors from '../utils/colors';
import { Layout } from '../components/Layout';
import { fetchUserFromSeed, fetchUsers } from '../utils/helpers';
import { APP_USER_SEED } from '../utils/constants';
import { User } from '../types';
import { GetStaticProps } from 'next';
import { Feed } from '../components/Feed';

type ProfileProps = {
  user: User;
};

export default function Profile({ user }: ProfileProps) {
  return (
    <Layout>
      <Box marginTop={10}>
        <Stack
          alignItems='center'
          borderStyle='solid'
          borderColor={colors.border}
          borderWidth={1}
          padding={5}
          borderRadius={10}
        >
          <Avatar size='2xl' src={user?.picture.large} />
          <Heading
            color={colors.text}
          >{`${user?.name.first} ${user?.name.last}`}</Heading>
          <Text color={colors.text}>{`@${user?.login.username}`}</Text>
        </Stack>
      </Box>
      <Feed isProfile />
    </Layout>
  );
}

export const getServerSideProps: GetStaticProps = async (context) => {
  let user = await fetchUserFromSeed(APP_USER_SEED);
  return {
    props: {
      user,
    },
  };
};
