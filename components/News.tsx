import { Stack, Box, Spinner, Link } from '@chakra-ui/core';
import useSWR from 'swr';
import colors from '../utils/colors';

type NewsProps = {
  children?: any;
};
export function News({ children }: NewsProps) {
  const { data, error } = useSWR<number[], Error>(
    'https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty'
  );

  if (error) return <Box>Failed to load stories</Box>;
  if (!data) return <Spinner></Spinner>;

  data.splice(3);

  return (
    <Stack
      marginTop={10}
      marginLeft={10}
      display={['none', 'none', 'block', 'block']}
    >
      <Box color={colors.text}>What's happening</Box>
      {data.map((id) => (
        <NewsItem key={id} storyId={id} />
      ))}
    </Stack>
  );
}

type NewsItemProps = {
  storyId: number;
};

interface HnStory {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

export function NewsItem({ storyId }: NewsItemProps) {
  const { data, error } = useSWR<HnStory, Error>(
    `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`
  );
  if (error) return <Box>Failed to load stories</Box>;
  if (!data) return <Spinner></Spinner>;

  return (
    <Box
      maxW={200}
      minH={10}
      border='solid'
      padding={5}
      color={colors.text}
      marginTop={2}
    >
      <Link href={data.url} isExternal>
        {data.title}
      </Link>
    </Box>
  );
}
