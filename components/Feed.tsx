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
  return <List>{children}</List>;
}

type FeedItemProps = {
  name: string;
  handle: string;
  content: string;
};

export function FeedItem({ name, handle, content }: FeedItemProps) {
  return (
    <ListItem marginTop={1}>
      <Box
        boxSizing='content-box'
        borderWidth='1px'
        borderStyle='solid'
        borderColor='#141d26'
      >
        <Flex margin={2}>
          <Avatar
            name={name}
            src='https://pbs.twimg.com/profile_images/1173439339898056704/AVWXSQ_f_400x400.jpg'
          />
          <Stack spacing={0} marginLeft={5}>
            <Stack isInline>
              <Text color='white'>{name}</Text>
              <Text color='grey'>{handle}</Text>
            </Stack>
            <Text color='white' marginTop={3}>
              {/* {content} */}
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </Stack>
        </Flex>
      </Box>
    </ListItem>
  );
}
