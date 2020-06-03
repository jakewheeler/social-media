import { Layout } from '../components/Layout';
import { Box } from '@chakra-ui/core';
import { Feed, FeedItemProps } from '../components/Feed';
import { useState, useEffect } from 'react';
import { Users, User } from '../interfaces/users';
import useSWR from 'swr';
import axios from 'axios';

const TIMELINE_KEY = 'tweets';

export default function Index() {
  let { data: user, error: userError } = useSWR<Users, Error>(
    'https://randomuser.me/api/?seed=mytestuseridk'
  );

  let { data: tweets, error: feedError } = useSWR<FeedItemProps[], Error>(
    'tweets',
    fetchTweets
  );

  const [appUser, setAppUser] = useState<FeedItemProps>();

  useEffect(() => {
    if (!user) return;
    async function fetchUser() {
      let appUser = await createUser(user!.results[0]);
      setAppUser(appUser);
    }
    fetchUser();
  }, [user]);

  if (!appUser) return <Box></Box>;

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
  let url = 'https://api.kanye.rest';
  let req = await axios.get<KanyeQuote>(url);
  return req.data.quote;
}

async function fetchTweets(): Promise<FeedItemProps[]> {
  const url = 'https://randomuser.me/api/?results=35';
  let users = await axios.get<Users>(url);
  return Promise.all(users.data.results.map((tweet) => createUser(tweet)));
}

interface KanyeQuote {
  quote: string;
}

export async function createUser(person: User): Promise<FeedItemProps> {
  return {
    avatarSrc: person.picture.thumbnail,
    content: await fetchQuote(),
    handle: `@${person.login.username}`,
    name: `${person.name.first} ${person.name.last}`,
    uuid: person.login.uuid,
  };
}
