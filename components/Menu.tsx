import { Stack, Link, Heading, Icon } from '@chakra-ui/core';
import NextLink from 'next/link';
import colors from '../utils/colors';

type MenuProps = {
  children?: any;
};

export function Menu({ children }: MenuProps) {
  return <Stack>{children}</Stack>;
}

type MenuItemProps = {
  icon: string;
  text?: string;
  link: string;
};

export function MenuItem({ icon, text, link }: MenuItemProps) {
  return (
    <Stack isInline marginTop={10}>
      <Stack isInline align='center'>
        <Icon name={icon} color={colors.icon} />
        <Heading as='h4' size='md'>
          <NextLink href={link}>
            <Link color='#ffffff'>{text}</Link>
          </NextLink>
        </Heading>
      </Stack>
    </Stack>
  );
}
