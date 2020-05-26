import { Layout } from '../components/Layout';
import { Flex, Box } from '@chakra-ui/core';
import { Feed, FeedItem, FeedItemProps } from '../components/Feed';
import { GetServerSideProps } from 'next';
import axios from 'axios';

interface IndexProps {
  feedList: FeedItemProps[];
}

export default function Index({ feedList }: IndexProps) {
  return (
    <Layout>
      <Flex direction='row' alignContent='flex-end'>
        <Feed>
          {feedList.map((feedItem) => (
            <FeedItem
              key={feedItem.handle}
              avatarSrc={feedItem.avatarSrc}
              content={feedItem.content}
              handle={feedItem.handle}
              name={feedItem.name}
            />
          ))}
        </Feed>
        <Box w='100%' bg='pink'>
          right
        </Box>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  let people = await axios.get<People>('https://randomuser.me/api/?results=5');
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
    return {
      avatarSrc: person.picture.thumbnail,
      content: 'temp',
      handle: `@${person.login.username}`,
      name: `${person.name.first} ${person.name.last}`,
    };
  });

  return { props: { feedList } };
};
