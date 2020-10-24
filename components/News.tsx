import { VStack, Box, Spinner, Link, Heading, BoxProps } from '@chakra-ui/core';
import useSWR from 'swr';
import colors from '../utils/colors';

export function News() {
  const { data, error } = useSWR<number[], Error>(
    'https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty'
  );

  if (error) return <Box>Failed to load stories</Box>;
  if (!data) return <Spinner margin='0 auto' color={colors.text}></Spinner>;

  data.splice(3);

  return (
    <VStack marginTop={10} marginLeft={5} align='left'>
      <Heading as='h1' size='lg' color={colors.text}>
        What's happening 🎉
      </Heading>
      {data.map((id) => (
        <NewsItem key={id} storyId={id} minH={100}/>
      ))}
    </VStack>
  );
}

type NewsItemProps = {
  storyId: number;
} & BoxProps;

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

export function NewsItem({ storyId, ...props }: NewsItemProps) {
  const { data } = useSWR<HnStory, Error>(
    `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`
  );

  if (!data) return <Box></Box>;

  return (
    <Box
      maxW={200}
      minH={10}
      rounded='lg'
      border='solid'
      padding={5}
      color={colors.text}
      marginTop={2}
      {...props}
    >
      <Link href={data.url} isExternal>
        {data.title}
      </Link>
    </Box>
  );
}
