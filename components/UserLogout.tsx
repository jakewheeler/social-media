import { Stack, Avatar, Button, Text } from '@chakra-ui/core';
import colors from '../utils/colors';
import { FeedItemProps } from '../types';

type UserLogoutProps = {
  user: FeedItemProps;
};

export function UserLogout({ user }: UserLogoutProps) {
  return (
    <Stack marginBottom={2} justifyContent='center'>
      <Stack isInline>
        <Avatar src={user.avatarSrc} />
        <Stack>
          <Text color={colors.text}>{user.name}</Text>
          <Text color={colors.text}>{user.handle}</Text>
        </Stack>
      </Stack>
      <Button
        onClick={() => {
          window.alert('goodbye!');
        }}
        colorScheme={colors.button}
      >
        Logout
      </Button>
    </Stack>
  );
}
