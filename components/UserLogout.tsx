import { Box, Stack, Avatar, Button, Spinner } from '@chakra-ui/core';
import colors from '../utils/colors';
import Router from 'next/router';
import { useAppUser } from '../utils/hooks';

function deleteLocalStorage() {
  localStorage.removeItem('seed');
  Router.push('/seed');
}

export function UserLogout() {
  let { user } = useAppUser();

  if (!user) return <Spinner color='white'></Spinner>;

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
