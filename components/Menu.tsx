import { List, ListItem } from '@chakra-ui/core';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/core';

type MenuProps = {
  children?: any;
};

export function Menu({ children }: MenuProps) {
  return <List spacing={3}>{children}</List>;
}

type MenuItemProps = {
  icon?: any;
  text: string;
  link: string;
};

export function MenuItem({ icon, text, link }: MenuItemProps) {
  return (
    <ListItem>
      <h2>
        <NextLink href={link}>
          <Link color='#ffffff'>{text}</Link>
        </NextLink>
      </h2>
    </ListItem>
  );
}
