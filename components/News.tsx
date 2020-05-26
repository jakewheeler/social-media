import { Stack, Box } from '@chakra-ui/core';

type NewsProps = {
  children?: any;
};
export function News({ children }: NewsProps) {
  return (
    <Stack>
      <NewsItem />
    </Stack>
  );
}

export function NewsItem() {
  return <Box>News Item</Box>;
}
