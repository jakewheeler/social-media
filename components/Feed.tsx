import {
  List,
  ListItem,
  Box,
  Stack,
  Text,
  Avatar,
  Flex,
  Spinner,
} from '@chakra-ui/core';
import axios from 'axios';
import useSWR from 'swr';
import { Users } from '../interfaces/users';
import { createUser } from '../pages/index';
import { Tweet } from '../components/Tweet';

type FeedProps = {
  user: FeedItemProps;
  tweets: FeedItemProps[] | undefined;
  timelineKey: string;
  error: Error | undefined;
};

export function Feed({ user, tweets, timelineKey, error }: FeedProps) {
  if (error)
    return (
      <Box textAlign='center'>
        <Text>Failed to load feed</Text>
      </Box>
    );

  if (!tweets)
    return (
      <Box textAlign='center'>
        <Spinner></Spinner>
      </Box>
    );

  return (
    <>
      <Tweet user={user} tweets={tweets} timelineKey={timelineKey} />
      <List minWidth={'100%'}>
        {tweets.map((tweet) => (
          <FeedItem
            key={`${tweet.uuid}-${Math.random()}`}
            avatarSrc={tweet.avatarSrc}
            content={tweet.content}
            handle={tweet.handle}
            name={tweet.name}
            uuid={tweet.uuid}
          />
        ))}
      </List>
    </>
  );
}

export type FeedItemProps = {
  avatarSrc: string;
  name: string;
  handle: string;
  content?: string;
  uuid?: string;
};

function FeedItem({ avatarSrc, name, handle, content }: FeedItemProps) {
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
