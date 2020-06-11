import { Stack, Link, Heading, Icon } from '@chakra-ui/core';
import NextLink from 'next/link';
import colors from '../utils/colors';

export function Menu() {
  return (
    <Stack>
      >
      <MenuItem icon='star' text='Home' link='/' disabled />
      <MenuItem icon='search' text='Explore' link='/' disabled />
      <MenuItem icon='info' text='Notifications' link='/' disabled />
      <MenuItem icon='email' text='Messages' link='/' disabled />
      <MenuItem icon='plus-square' text='Lists' link='/' disabled />
      <MenuItem icon='view' text='Profile' link='/profile' />
      <MenuItem icon='question' text='More' link='/' disabled />
    </Stack>
  );
}

type MenuItemProps = {
  icon: string;
  text?: string;
  link: string;
  disabled?: boolean;
};

export function MenuItem({
  icon,
  text,
  link,
  disabled = false,
}: MenuItemProps) {
  return (
    <Stack isInline marginTop={10}>
      <Stack isInline align='center'>
        <Icon name={icon} color={disabled ? 'grey' : colors.icon} />
        <Heading as='h4' size='md'>
          <NextLink href={link}>
            <Link color='#ffffff' isDisabled={disabled}>
              {text}
            </Link>
          </NextLink>
        </Heading>
      </Stack>
    </Stack>
  );
}
