import { Layout } from '../components/Layout';
import { Box, Spinner } from '@chakra-ui/core';
import { Feed, FeedItemProps } from '../components/Feed';
import { Users, User } from '../interfaces/users';
import axios from 'axios';
import { useFeed, useSeed, useAppUser } from '../utils/hooks';

const TIMELINE_KEY = 'tweets';

export default function Index() {
  let { seed } = useSeed();

  let { user: appUser } = useAppUser();

  let { tweets, error: feedError } = useFeed();

  if (!appUser || !seed)
    return <Spinner color='white' aria-busy='true'></Spinner>;

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

export async function fetchQuote(): Promise<string> {
  let url = `https://api.kanye.rest?nocache=${Math.random()}`;
  let req = await axios.get<KanyeQuote>(url);
  return req.data.quote;
}

export async function fetchUser(): Promise<User> {
  const url = 'https://randomuser.me/api/';
  let users = await axios.get<Users>(url);
  return users.data.results[0];
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
