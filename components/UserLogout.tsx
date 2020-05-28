import { Box, Stack, Avatar, Button } from '@chakra-ui/core';
import { FeedItemProps } from '../components/Feed';

interface UserLogoutProps {
  user: FeedItemProps;
}

export function UserLogout({ user }: UserLogoutProps) {
  return (
    <Stack marginBottom={2}>
      <Stack isInline>
        <Avatar src={user.avatarSrc} />
        <Stack>
          <Box color='white'>{user.name}</Box>
          <Box color='white'>{user.handle}</Box>
        </Stack>
      </Stack>
      <Button
        onClick={() => console.log('nothing to see here, folks')}
        variantColor='blue'
      >
        Logout
      </Button>
    </Stack>
  );
}
