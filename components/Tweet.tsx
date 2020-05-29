import {
  Textarea,
  Flex,
  Stack,
  Avatar,
  Button,
  Text,
  Box,
} from '@chakra-ui/core';
import { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { FeedItemProps } from '../components/Feed';

type TweetProps = {
  user: FeedItemProps;
  tweets: FeedItemProps[];
  setTweets: Dispatch<SetStateAction<FeedItemProps[]>>;
};

export function Tweet({ user, tweets, setTweets }: TweetProps) {
  const [btnIsDisabled, setBtnIsDisabled] = useState(true);
  const [tweetContent, setTweetContent] = useState('');
  const [charCount, setCharCount] = useState(0);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let inputValue = e.target.value;
    if (!inputValue) {
      setBtnIsDisabled(true);
    } else {
      setBtnIsDisabled(false);
    }
    setTweetContent(inputValue);
    setCharCount(inputValue.length);
    if (inputValue.length > 180) {
      setBtnIsDisabled(true);
    }
  };

  const submitTweet = () => {
    if (!btnIsDisabled) {
      // submit and clear
      let newTweets = addNewTweet();
      setTweets(newTweets);
      setTweetContent('');
      setBtnIsDisabled(true);
    }
  };

  const addNewTweet = () => {
    let newTweets = [...tweets];
    let newTweet: FeedItemProps = {
      ...user,
      content: tweetContent,
    };
    newTweets.unshift(newTweet);
    return newTweets;
  };

  return (
    <Flex
      direction='column'
      border={1}
      borderColor='grey'
      borderStyle='solid'
      boxSizing='content-box'
    >
      <Stack isInline margin={2}>
        <Avatar src={user.avatarSrc} />
        <Textarea
          placeholder="What's happening?"
          resize='none'
          bg='#243447'
          color='white'
          onChange={handleInputChange}
          value={tweetContent}
        ></Textarea>
      </Stack>
      <Stack margin={2}>
        <Box color={charCount > 180 ? 'tomato' : 'white'} alignSelf='flex-end'>
          {charCount}
        </Box>
        <Button
          variantColor='blue'
          variant='solid'
          alignSelf='flex-end'
          isDisabled={btnIsDisabled}
          onClick={submitTweet}
        >
          Tweet
        </Button>
      </Stack>
    </Flex>
  );
}
