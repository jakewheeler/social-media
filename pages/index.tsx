import { Layout } from '../components/Layout';
import { Flex, Box } from '@chakra-ui/core';
import { Feed, FeedItem, FeedItemProps } from '../components/Feed';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { News } from '../components/News';
import { Tweet } from '../components/Tweet';
import { useState } from 'react';

interface IndexProps {
  feedList: FeedItemProps[];
  appUser: FeedItemProps;
}

export default function Index({ feedList, appUser }: IndexProps) {
  const [tweets, setTweets] = useState(feedList);
  const [user, setUser] = useState(appUser);
  return (
    <Layout>
      <Tweet user={user} tweets={tweets} setTweets={setTweets} />
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
        <News />
      </Flex>
      <style jsx global>{`
        html {
          background: #243447;
          font-family: Helvetica;
        }
      `}</style>
    </Layout>
  );
}

interface Person {
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  login: {
    uuid: string;
    username: string;
  };

  name: {
    first: string;
    last: string;
  };
}

interface People {
  results: Person[];
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

export function createUser(person: Person) {
  return {
    avatarSrc: person.picture.thumbnail,
    content:
      'This is some temporary sentence that will be changed later but for now its just for the sake of testing ok thank you',
    handle: `@${person.login.username}`,
    name: `${person.name.first} ${person.name.last}`,
  };
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let people = await axios.get<People>('https://randomuser.me/api/?results=35');
  let user = await axios.get<People>(
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
  let feedList = people.data.results.map((person, index) => {
    return createUser(person);
  });

  let appUser = createUser(user.data.results[0]);

  return { props: { feedList, appUser } };
};
