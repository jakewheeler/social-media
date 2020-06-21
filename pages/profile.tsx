import { Text, Avatar, Stack, Box, Heading } from '@chakra-ui/core';
import colors from '../utils/colors';
import { Layout } from '../components/Layout';
import useSWR from 'swr';
import { fetchUserFromSeed } from '../utils/helpers';
import { APP_USER_SEED } from '../utils/constants';
import { User } from '../types';

export default function Profile() {
  let { data: user, error } = useSWR<User>('appUser', () =>
    fetchUserFromSeed(APP_USER_SEED)
  );

  return (
    <Box>
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
      </Layout>
    </Box>
  );
}
