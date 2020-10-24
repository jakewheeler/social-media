import { VStack, Box, Spinner, Link, Heading, BoxProps, Skeleton } from '@chakra-ui/core';
import useSWR from 'swr';
import colors from '../utils/colors';

export function News() {
  const { data, error } = useSWR<number[], Error>(
    'https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty'
  );
  

  if (error) return <Box>Failed to load stories</Box>;

  const getData = (data: number[]) => {
    const [first, second, third] = data;
    return [first, second, third]
  }

  return (
    <VStack marginLeft={5} align='left'>
      <Heading as='h1' size='md' color={colors.text} flexWrap='nowrap'>
        What's happening 🎉
      </Heading>
      {data ? getData(data).map((id) => (
        <NewsItem key={id} storyId={id} minH={100}/>
      )) : <SkeleBlock/>}
    </VStack>
  );
}

// placeholder for news items when loading
function SkeleBlock() {
  return (
    <VStack align='left'>
      <Skeleton minH={100} startColor="blue.500" endColor="red.500">hi</Skeleton>
      <Skeleton minH={100} startColor="blue.500" endColor="purple.500">hi</Skeleton>
      <Skeleton minH={100} startColor="blue.500" endColor="yellow.500">hi</Skeleton>
    </VStack>

  )
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
