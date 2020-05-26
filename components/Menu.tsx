import { Stack, Link, Heading, Box } from '@chakra-ui/core';
import NextLink from 'next/link';

type MenuProps = {
  children?: any;
};

export function Menu({ children }: MenuProps) {
  return <Stack marginRight={55}>{children}</Stack>;
}

type MenuItemProps = {
  icon?: any;
  text: string;
  link: string;
};

export function MenuItem({ icon, text, link }: MenuItemProps) {
  return (
    <Stack isInline>
      <Box marginTop={10}>{icon}</Box>
      <Box marginTop={10}>
        <Heading as='h4' size='md'>
          <NextLink href={link}>
            <Link color='#ffffff'>{text}</Link>
          </NextLink>
        </Heading>
      </Box>
    </Stack>
  );
}
