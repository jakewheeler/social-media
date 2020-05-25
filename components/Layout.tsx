import Head from 'next/head';
import { PropsWithChildren } from 'react';
import { Heading } from '@chakra-ui/core';

type LayoutProps = {};

export function Layout(props: PropsWithChildren<LayoutProps>) {
  return (
    <div className='container'>
      <Head>
        <title>Social Media</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header>
        <Heading as='h2' color='white'>
          Social Media
        </Heading>
      </header>
      <main>{props.children}</main>
    </div>
  );
}
