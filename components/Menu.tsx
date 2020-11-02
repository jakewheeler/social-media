import {
  VStack,
  Link,
  Heading,
  Text,
  LinkProps,
  HStack,
} from '@chakra-ui/core';
import {
  ExternalLinkIcon,
  ArrowUpIcon,
  EmailIcon,
  InfoIcon,
  PlusSquareIcon,
  StarIcon,
  ViewIcon,
  SearchIcon,
  InfoOutlineIcon,
} from '@chakra-ui/icons';
import NextLink from 'next/link';
import colors from '../utils/colors';

export function Menu() {
  return (
    <VStack align='left' spacing={5}>
      <MenuItem icon={<StarIcon color={colors.icon} />} text='Home' link='/' />
      <MenuItem
        icon={<SearchIcon color='grey' />}
        text='Explore'
        link='/'
        isDisabled
      />
      <MenuItem
        icon={<InfoIcon color='grey' />}
        text='Notifications'
        link='/'
        isDisabled
      />
      <MenuItem
        icon={<EmailIcon color='grey' />}
        text='Messages'
        link='/'
        isDisabled
      />
      <MenuItem
        icon={<PlusSquareIcon color='grey' />}
        text='Lists'
        link='/'
        isDisabled
      />
      <MenuItem
        icon={<ViewIcon color={colors.icon} />}
        text='Profile'
        link='/profile'
      />
      <MenuItem
        icon={<InfoOutlineIcon color='grey' />}
        text='About'
        link='/about'
        isDisabled
      />
      <MenuItem
        icon={<ArrowUpIcon color={colors.icon} />}
        text='GitHub'
        link='https://github.com/jakewheeler/social-media'
        isExternal
      />
    </VStack>
  );
}

type MenuItemProps = {
  icon: React.ReactElement;
  text?: string;
  link: string;
  isDisabled?: boolean;
  isExternal?: boolean;
};

export function MenuItem({
  icon,
  text,
  link,
  isDisabled = false,
  isExternal = false,
}: MenuItemProps) {
  return (
    <VStack align='left'>
      <HStack>
        {icon}
        <Heading as='h4' size='md'>
          {!isExternal ? (
            <MenuLink link={link} isDisabled={isDisabled}>
              {text}
            </MenuLink>
          ) : (
            <Link color={colors.link} href={link} isExternal>
              {text} <ExternalLinkIcon name='external-link' mx='2px' />
            </Link>
          )}
        </Heading>
      </HStack>
    </VStack>
  );
}

type MenuLink = {
  isDisabled: boolean;
  link: string;
} & LinkProps;

function MenuLink({ isDisabled = true, link, children, ...props }: MenuLink) {
  // Chakra UI no longer provides an 'isDisabled' prop, so we
  // will just make our own 🙂
  return isDisabled ? (
    <Text color='grey'>{children}</Text>
  ) : (
    <NextLink href={link}>
      <Link color={colors.link} {...props}>
        {children}
      </Link>
    </NextLink>
  );
}
