import {
  List,
  ListItem,
  Box,
  Stack,
  Text,
  Avatar,
  Flex,
} from '@chakra-ui/core';

type FeedProps = {
  children?: any;
};

export function Feed({ children }: FeedProps) {
  return <List minWidth={'100%'}>{children}</List>;
}

export type FeedItemProps = {
  avatarSrc: string;
  name: string;
  handle: string;
  content?: string;
};

export function FeedItem({ avatarSrc, name, handle, content }: FeedItemProps) {
  return (
    <ListItem marginTop={1}>
      <Box
        boxSizing='content-box'
        borderWidth='1px'
        borderStyle='solid'
        borderColor='grey'
        minWidth='100%'
        minHeight={100}
      >
        <Flex margin={2}>
          <Avatar name={name} src={avatarSrc} />
          <Stack spacing={0} marginLeft={5}>
            <Stack isInline>
              <Text color='white'>{name}</Text>
              <Text color='grey'>{handle}</Text>
            </Stack>
            <Text color='white' marginTop={3}>
              {content}
            </Text>
          </Stack>
        </Flex>
      </Box>
    </ListItem>
  );
}
