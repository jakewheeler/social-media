import { Layout } from '../components/Layout';
import { Box, Spinner } from '@chakra-ui/core';
import { Feed, FeedItemProps } from '../components/Feed';
import { useState, useEffect } from 'react';
import { Users, User } from '../interfaces/users';
import useSWR from 'swr';
import axios from 'axios';
import Router from 'next/router';

const TIMELINE_KEY = 'tweets';

export default function Index() {
  const [seed, setSeed] = useState<string | null>('');
  const [appUser, setAppUser] = useState<FeedItemProps>();

  // using a seed always returns an array of Users
  let { data: user, error: userError } = useSWR<Users, Error>(
    `https://randomuser.me/api/?seed=${seed}`
  );

  let { data: tweets, error: feedError } = useSWR<FeedItemProps[], Error>(
    'tweets',
    fetchInitialFeedContent
  );

  useEffect(() => {
    if (seed !== '' && !seed) Router.push('/seed');

    async function getSeed() {
      let seed = localStorage.getItem('seed');
      setSeed(seed);
    }
    getSeed();
  }, [seed, setSeed]);

  useEffect(() => {
    if (!seed || !user) return;
    async function fetchUser() {
      let appUser = await createFeedItem(user!.results[0]);
      setAppUser(appUser);
    }
    fetchUser();
  }, [seed, user]);

  if (!appUser || !seed) return <Spinner aria-busy='true'></Spinner>;

  return (
    <Box>
      <Layout user={appUser} tweets={tweets} timelineKey={TIMELINE_KEY}>
        <Feed
          user={appUser}
          tweets={tweets}
          timelineKey={TIMELINE_KEY}
          error={feedError}
        />
      </Layout>
    </Box>
  );
}

async function fetchQuote(): Promise<string> {
  let url = `https://api.kanye.rest?nocache=${Math.random()}`;
  let req = await axios.get<KanyeQuote>(url);
  return req.data.quote;
}

async function fetchUsers(): Promise<Users> {
  const url = 'https://randomuser.me/api/?results=35';
  let users = await axios.get<Users>(url);
  console.log(users);
  return users.data;
}

async function fetchInitialFeedContent(): Promise<FeedItemProps[]> {
  let users = await fetchUsers();
  return Promise.all(users.results.map((feedItem) => createFeedItem(feedItem)));
}

interface KanyeQuote {
  quote: string;
}

export async function createFeedItem(person: User): Promise<FeedItemProps> {
  return {
    avatarSrc: person.picture.thumbnail,
    content: await fetchQuote(),
    handle: `@${person.login.username}`,
    name: `${person.name.first} ${person.name.last}`,
    uuid: person.login.uuid,
  };
}
