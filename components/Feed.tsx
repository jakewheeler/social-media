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

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Users } from '../interfaces/users';
import { createUser } from '../pages/index';

export function Feed() {
  const url = 'https://randomuser.me/api/?results=35';
  const [tweets, setTweets] = useState<FeedItemProps[]>([]);
  let { data: feedList, error: feedError } = useSWR<Users, Error>(url);

  // tweet handler
  useEffect(() => {
    if (!feedList) return;

    let feed = feedList.results.map((tweet) => {
      return createUser(tweet);
    });
    setTweets(feed);
  }, [feedList]);

  if (feedError)
    return (
      <Box textAlign='center'>
        <Text>Failed to load feed</Text>
      </Box>
    );
  if (!feedList)
    return (
      <Box textAlign='center'>
        <Spinner></Spinner>
      </Box>
    );

  return (
    <List minWidth={'100%'}>
      {tweets.map((tweet) => (
        <FeedItem
          key={tweet.handle + Math.random()}
          avatarSrc={tweet.avatarSrc}
          content={tweet.content}
          handle={tweet.handle}
          name={tweet.name}
        />
      ))}
    </List>
  );
}

export type FeedItemProps = {
  avatarSrc: string;
  name: string;
  handle: string;
  content?: string;
  uuid?: string;
};

export function FeedItem({ avatarSrc, name, handle, content }: FeedItemProps) {
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
