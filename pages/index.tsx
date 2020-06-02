import { Layout } from '../components/Layout';
import { Flex, Box, Spinner } from '@chakra-ui/core';
import { Feed, FeedItemProps } from '../components/Feed';
import { Tweet } from '../components/Tweet';
import { useState, useEffect } from 'react';
import { Users, User } from '../interfaces/users';
import useSWR from 'swr';
import axios from 'axios';

interface IndexProps {
  feedList: FeedItemProps[];
  appUser: FeedItemProps;
}

export default function Index() {
  let { data: user, error: userError } = useSWR<Users, Error>(
    'https://randomuser.me/api/?uuid=155e77ee-ba6d-486f-95ce-0e0c0fb4b919'
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
      <Layout user={appUser}>
        <Feed user={appUser}/>
      </Layout>
    </Box>
  );
}

async function fetchQuote(): Promise<string> {
  let url = 'https://api.kanye.rest';
  let req = await axios.get<KanyeQuote>(url);
  return req.data.quote;
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
