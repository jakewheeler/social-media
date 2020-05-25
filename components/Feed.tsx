import { List, ListItem, Box, Stack, Text } from '@chakra-ui/core';

type FeedProps = {
  children?: any;
};

export function Feed({ children }: FeedProps) {
  return <List>{children}</List>;
}

export function FeedItem() {
  return (
    <ListItem>
      <Box
        h='100px'
        w='100%'
        borderWidth='1px'
        borderStyle='solid'
        borderColor='#141d26'
      >
        <Stack spacing={1} marginLeft='5px'>
          <Stack isInline>
            <Text color='white'>User name</Text>
            <Text color='grey'>@username</Text>
          </Stack>
          <Text color='white'>Some sort of status</Text>
        </Stack>
      </Box>
    </ListItem>
  );
}
