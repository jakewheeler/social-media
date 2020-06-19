import { Text, Avatar, Stack, Box } from '@chakra-ui/core';
import colors from '../utils/colors';
import { useAppUser } from '../utils/hooks';
import { Layout } from '../components/Layout';

export default function Profile() {
  let { user } = useAppUser();

  return (
    <Box>
      <Layout>
        <Box
          marginTop={10}
          minWidth={'100%'}
          bgImage='https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80'
          bgPos='center'
        >
          <Stack>
            <Avatar src={user?.avatarSrc} />
            <Text color={colors.text}>{user?.name}</Text>
            <Text color={colors.text}>{user?.handle}</Text>
          </Stack>
        </Box>
      </Layout>
    </Box>
  );
}
