import { Box, Stack, Avatar, Button } from '@chakra-ui/core';
import { FeedItemProps } from '../components/Feed';
import colors from '../utils/colors';

interface UserLogoutProps {
  user: FeedItemProps;
}

export function UserLogout({ user }: UserLogoutProps) {
  return (
    <Stack marginBottom={2}>
      <Stack isInline>
        <Avatar src={user.avatarSrc} />
        <Stack>
          <Box color={colors.text}>{user.name}</Box>
          <Box color={colors.text}>{user.handle}</Box>
        </Stack>
      </Stack>
      <Button onClick={() => alert('Fake logout')} variantColor='blue'>
        Logout
      </Button>
    </Stack>
  );
}
