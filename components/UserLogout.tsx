import { Box, Stack, Avatar, Button } from '@chakra-ui/core';
import { FeedItemProps } from '../components/Feed';
import colors from '../utils/colors';
import Router from 'next/router';

interface UserLogoutProps {
  user: FeedItemProps;
}

function deleteLocalStorage() {
  localStorage.removeItem('seed');
  Router.push('/seed');
}

export function UserLogout({ user }: UserLogoutProps) {
  return (
    <Stack marginBottom={2} justifyContent='center'>
      <Stack isInline>
        <Avatar src={user.avatarSrc} />
        <Stack>
          <Box color={colors.text}>{user.name}</Box>
          <Box color={colors.text}>{user.handle}</Box>
        </Stack>
      </Stack>
      <Button onClick={deleteLocalStorage} variantColor={colors.button}>
        Logout
      </Button>
    </Stack>
  );
}
