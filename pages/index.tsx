import { Layout } from '../components/Layout';
import { Flex, Box, Spinner } from '@chakra-ui/core';
import { Feed, FeedItem, FeedItemProps } from '../components/Feed';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { Tweet } from '../components/Tweet';
import { useState, useEffect } from 'react';
import { Users, User } from '../interfaces/users';
import useSWR from 'swr';

interface IndexProps {
  feedList: FeedItemProps[];
  appUser: FeedItemProps;
}

export default function Index() {
  let { data: feedList, error: feedError } = useSWR<Users, Error>(
    'https://randomuser.me/api/?results=35'
  );

  const [tweets, setTweets] = useState<FeedItemProps[]>([]);

  let { data: user, error: userError } = useSWR<Users, Error>(
    'https://randomuser.me/api/?uuid=155e77ee-ba6d-486f-95ce-0e0c0fb4b919'
  );

  const [appUser, setAppUser] = useState<FeedItemProps>();

  useEffect(() => {
    if (!user) return;
    let appUser = createUser(user.results[0]);
    setAppUser(appUser);
  }, [user]);

  // tweet handler
  useEffect(() => {
    if (!feedList) return;

    let feed = feedList.results.map((tweet) => {
      return createUser(tweet);
    });
    setTweets(feed);
  }, [feedList]);

  if (feedError) return <Box>Failed to load feed</Box>;
  if (!feedList) return <Spinner></Spinner>;

  return (
    <Box>
      {appUser && tweets ? (
        <Layout user={appUser}>
          <Tweet user={appUser} tweets={tweets} setTweets={setTweets} />
          <Flex direction='row' alignContent='flex-end'>
            <Feed>
              {tweets.map((tweet) => (
                <FeedItem
                  key={tweet.handle + Math.random()}
                  avatarSrc={tweet.avatarSrc}
                  content={tweet.content}
                  handle={tweet.handle}
                  name={tweet.name}
                />
              ))}
            </Feed>
          </Flex>
        </Layout>
      ) : (
        <Spinner></Spinner>
      )}
    </Box>
  );
}

interface KanyeQuote {
  quote: string;
}

async function getKanyeQuote(): Promise<string> {
  let str = '';
  try {
    let req = await axios.get<KanyeQuote>('https://api.kanye.rest');
    str = req.data.quote;
  } catch (error) {
    console.error(error);
  }

  return str;
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  let people = await axios.get<Users>('https://randomuser.me/api/?results=35');
  let user = await axios.get<Users>(
    'https://randomuser.me/api/?uuid=155e77ee-ba6d-486f-95ce-0e0c0fb4b919'
  );
  // let quotes = async () => {
  //   let quotes = [];
  //   let numQuotes = people.data.results.length;
  //   for (let i = 0; i < numQuotes; i++) {
  //     let quote = await getKanyeQuote();
  //     quotes.push(quote);
  //   }
  //   return quotes;
  // };
  // let quoteList = await quotes();
  let feedList = people.data.results.map((person) => {
    return createUser(person);
  });

  let appUser = createUser(user.data.results[0]);

  return { props: { feedList, appUser } };
};
