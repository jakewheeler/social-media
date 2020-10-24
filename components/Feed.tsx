import {
  List,
  ListItem,
  Box,
  Stack,
  Text,
  Avatar,
  Flex,
  Spinner,
  Slide,
} from '@chakra-ui/core';
import { addNewTweet } from '../components/Tweet';
import colors from '../utils/colors';
import { fetchUser, createFeedItem, fetchQuote } from '../utils/helpers';
import { useEffect } from 'react';
import { FeedItemProps } from '../types';
import { useAppUser } from '../utils/hooks';
import { useStore, api } from '../utils/stores';

type FeedProps = {
  isProfile?: boolean;
};

export function Feed({ isProfile = false }: FeedProps) {
  let tweets = useStore((state) => state.json);

  if (!tweets)
    return (
      <Box textAlign='center'>
        <Spinner color={colors.text}></Spinner>
      </Box>
    );

  let { user } = useAppUser();

  useEffect(() => {
    const interval = setInterval(async () => {
      let tweetUser = await createFeedItem(await fetchUser());
      let message = await fetchQuote();
      let newTweets = addNewTweet(tweetUser, message, tweets);
      api.setState({ json: newTweets });
    }, 20000);
    return () => clearInterval(interval);
  }, [tweets, api.setState]);

  return (
    // <Slide placement='bottom' timeout={250} in={!!tweets}>
    //   {(styles) => (
    //     <Box style={{ ...styles, position: 'static' }} minWidth='100%'>
    <List borderBottom={`1px solid ${colors.border}`} minWidth='100%'>
      {!isProfile
        ? tweets.map((tweet) => (
            <FeedItem
              key={`${tweet.uuid}-${Math.random()}`}
              avatarSrc={tweet.avatarSrc}
              content={tweet.content}
              handle={tweet.handle}
              name={tweet.name}
              uuid={tweet.uuid}
            />
          ))
        : tweets
            .filter((tweet) => tweet.handle === user?.handle)
            .map((tweet) => (
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
    //     </Box>
    //   )}
    // </Slide>
  );
}
function FeedItem({ avatarSrc, name, handle, content }: FeedItemProps) {
  return (
    <ListItem overflowWrap='anywhere'>
      <Box
        boxSizing='content-box'
        borderTop='1px solid'
        borderLeft='1px solid'
        borderRight='1px solid'
        borderColor={colors.border}
        minWidth='100%'
        minHeight={100}
      >
        <Flex padding={5}>
          <Avatar name={name} src={avatarSrc} />
          <Stack spacing={0} marginLeft={5}>
            <Stack isInline spacing={3}>
              <Text color={colors.text}>{name}</Text>
              <Text color='gray.400'>{handle}</Text>
            </Stack>
            <Text color={colors.text} marginTop={3}>
              {content}
            </Text>
          </Stack>
        </Flex>
      </Box>
    </ListItem>
  );
}
