import { Stack, Avatar, Button, Spinner, Text } from '@chakra-ui/core';
import colors from '../utils/colors';
import { useAppUser } from '../utils/hooks';

export function UserLogout() {
  let { user } = useAppUser();

  if (!user) return <Spinner color='white'></Spinner>;

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
        variantColor={colors.button}
      >
        Logout
      </Button>
    </Stack>
  );
}
