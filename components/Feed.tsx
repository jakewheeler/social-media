import {
  List,
  ListItem,
  Box,
  Stack,
  Text,
  Avatar,
  Flex,
  Link,
} from '@chakra-ui/core';
import NextLink from 'next/link';

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
  uuid?: string;
};

export function FeedItem({
  avatarSrc,
  name,
  handle,
  content,
  uuid,
}: FeedItemProps) {
  return (
    <ListItem marginTop={1} overflowWrap='anywhere'>
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
            <Stack isInline spacing={3}>
              <Box>
                <NextLink as={`/profile/${uuid}`} href='/profile/[uuid]'>
                  <Link color='white'>{name}</Link>
                </NextLink>
              </Box>
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
