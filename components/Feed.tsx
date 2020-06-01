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
import axios from 'axios';
import useSWR from 'swr';
import { Users } from '../interfaces/users';
import { createUser } from '../pages/index';

async function fetchTweets(): Promise<FeedItemProps[]> {
  const url = 'https://randomuser.me/api/?results=35';
  let users = await axios.get<Users>(url);
  let feed = users.data.results.map((tweet) => {
    return createUser(tweet);
  });
  return feed;
}

export function Feed() {
  let { data: tweets, error: feedError } = useSWR<FeedItemProps[], Error>(
    'tweets',
    fetchTweets
  );

  if (feedError)
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
    <List minWidth={'100%'}>
      {tweets.map((tweet) => (
        <FeedItem
          key={tweet.handle + Math.random()}
          avatarSrc={tweet.avatarSrc}
          // content={tweet.content}
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

async function fetchQuote(): Promise<string> {
  let url = 'https://api.kanye.rest';
  let req = await axios.get<KanyeQuote>(url);
  return req.data.quote;
}

export function FeedItem({ avatarSrc, name, handle, content }: FeedItemProps) {
  let { data, error } = useSWR<string, Error>(`${handle}-yerdi`, fetchQuote);

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
            {data ? (
              <Text color='white' marginTop={3}>
                {data}
              </Text>
            ) : (
              <Box textAlign='center'>
                <Spinner></Spinner>
              </Box>
            )}
          </Stack>
        </Flex>
      </Box>
    </ListItem>
  );
}

interface KanyeQuote {
  quote: string;
}
