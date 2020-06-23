import { Stack, Link, Heading, Icon } from '@chakra-ui/core';
import NextLink from 'next/link';
import colors from '../utils/colors';

export function Menu() {
  return (
    <Stack>
      <MenuItem icon='star' text='Home' link='/' />
      <MenuItem icon='search' text='Explore' link='/' disabled />
      <MenuItem icon='info' text='Notifications' link='/' disabled />
      <MenuItem icon='email' text='Messages' link='/' disabled />
      <MenuItem icon='plus-square' text='Lists' link='/' disabled />
      <MenuItem icon='view' text='Profile' link='/profile' />
      <MenuItem icon='info-outline' text='About' link='/about' disabled />
      <MenuItem
        icon='arrow-up'
        text='GitHub'
        link='https://github.com/jakewheeler/social-media'
        isExternal
      />
    </Stack>
  );
}

type MenuItemProps = {
  icon: string;
  text?: string;
  link: string;
  disabled?: boolean;
  isExternal?: boolean;
};

export function MenuItem({
  icon,
  text,
  link,
  disabled = false,
  isExternal = false,
}: MenuItemProps) {
  return (
    <Stack isInline marginTop={10}>
      <Stack isInline align='center'>
        <Icon name={icon} color={disabled ? 'grey' : colors.icon} />
        <Heading as='h4' size='md'>
          {!isExternal ? (
            <NextLink href={link}>
              <Link color={colors.link} isDisabled={disabled}>
                {text}
              </Link>
            </NextLink>
          ) : (
            <Link
              color={colors.link}
              isDisabled={disabled}
              href={link}
              isExternal
            >
              {text} <Icon name='external-link' mx='2px' />
            </Link>
          )}
        </Heading>
      </Stack>
    </Stack>
  );
}
