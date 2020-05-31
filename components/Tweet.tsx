import { Textarea, Flex, Stack, Avatar, Button, Box } from '@chakra-ui/core';
import { ChangeEvent, Dispatch, SetStateAction, useReducer } from 'react';
import { FeedItemProps } from '../components/Feed';

type TweetProps = {
  user: FeedItemProps;
  tweets: FeedItemProps[];
  setTweets: Dispatch<SetStateAction<FeedItemProps[]>>;
};

type TweetState = {
  btnIsDisabled: boolean;
  tweetContent: string;
  charCount: number;
};

const tweetState: TweetState = {
  btnIsDisabled: true,
  tweetContent: '',
  charCount: 0,
};

type TweetReducerAction =
  | { type: 'SUBMIT_TWEET' }
  | { type: 'DISABLE_BTN' }
  | { type: 'ENABLE_BTN' }
  | { type: 'HANDLE_TWEET_CHANGE'; tweetValue: string };

function tweetReducer(state: TweetState, action: TweetReducerAction) {
  switch (action.type) {
    case 'SUBMIT_TWEET':
      return { ...state, btnIsDisabled: true, tweetContent: '', charCount: 0 };
    case 'DISABLE_BTN':
      return { ...state, btnIsDisabled: true };
    case 'ENABLE_BTN':
      return { ...state, btnIsDisabled: false };
    case 'HANDLE_TWEET_CHANGE':
      return {
        ...state,
        btnIsDisabled:
          action.tweetValue.length > 180 || action.tweetValue.length === 0
            ? true
            : false,
        tweetContent: action.tweetValue,
        charCount: action.tweetValue.length,
      };
  }
}

export function Tweet({ user, tweets, setTweets }: TweetProps) {
  const [state, dispatch] = useReducer(tweetReducer, tweetState);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let inputValue = e.target.value;
    dispatch({ type: 'HANDLE_TWEET_CHANGE', tweetValue: inputValue });
  };

  const submitTweet = () => {
    if (!state.btnIsDisabled) {
      // submit and clear
      let newTweets = addNewTweet();
      setTweets(newTweets);
      dispatch({ type: 'SUBMIT_TWEET' });
    }
  };

  const addNewTweet = () => {
    let newTweets = [...tweets];
    let newTweet: FeedItemProps = {
      ...user,
      content: state.tweetContent,
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
          value={state.tweetContent}
        ></Textarea>
      </Stack>
      <Stack margin={2}>
        <Box
          color={state.charCount > 180 ? 'tomato' : 'white'}
          alignSelf='flex-end'
        >
          {state.charCount}
        </Box>
        <Button
          variantColor='blue'
          variant='solid'
          alignSelf='flex-end'
          isDisabled={state.btnIsDisabled}
          onClick={submitTweet}
        >
          Tweet
        </Button>
      </Stack>
    </Flex>
  );
}
