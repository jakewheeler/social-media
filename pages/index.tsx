import { Layout } from '../components/Layout';
import { Flex, Box, Spinner } from '@chakra-ui/core';
import { Feed, FeedItemProps } from '../components/Feed';
import { Tweet } from '../components/Tweet';
import { useState, useEffect } from 'react';
import { Users, User } from '../interfaces/users';
import useSWR from 'swr';

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
    let appUser = createUser(user.results[0]);
    setAppUser(appUser);
  }, [user]);

  if (!appUser) return <Box></Box>;

  return (
    <Box>
      <Layout user={appUser}>
        {/* <Tweet user={appUser} tweets={tweets} setTweets={setTweets} /> */}
        <Feed />
      </Layout>
    </Box>
  );
}



export function createUser(person: User): FeedItemProps {
  return {
    avatarSrc: person.picture.thumbnail,
    content:
      'This is some temporary sentence that will be changed later but for now its just for the sake of testing ok thank you',
    handle: `@${person.login.username}`,
    name: `${person.name.first} ${person.name.last}`,
    uuid: person.login.uuid,
  };
}
