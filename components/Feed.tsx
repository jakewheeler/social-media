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
import { Tweet } from '../components/Tweet';
import colors from '../utils/colors';

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
        <Text color={colors.text}>Failed to load feed</Text>
      </Box>
    );

  if (!tweets)
    return (
      <Box textAlign='center'>
        <Spinner color={colors.text}></Spinner>
      </Box>
    );

  return (
    <>
      <Tweet user={user} tweets={tweets} timelineKey={timelineKey} />
      <List minWidth={'100%'} borderBottom={`1px solid ${colors.border}`}>
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
        <Flex margin={2}>
          <Avatar name={name} src={avatarSrc} />
          <Stack spacing={0} marginLeft={5}>
            <Stack isInline spacing={3}>
              <Text color={colors.text}>{name}</Text>
              <Text color={colors.border}>{handle}</Text>
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
