import {
  Textarea,
  Flex,
  Stack,
  Avatar,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner,
} from '@chakra-ui/core';
import { ChangeEvent, useReducer } from 'react';
import { FeedItemProps } from '../types';
import colors from '../utils/colors';
import { useAppUser } from '../utils/hooks';
import { useStore, api } from '../utils/stores';

type TweetProps = {
  closeModal?: Function | null;
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

export function addNewTweet(
  user: FeedItemProps,
  message: string,
  tweets: FeedItemProps[]
): FeedItemProps[] {
  let empty: FeedItemProps[] = [];
  if (!tweets) return empty;

  let newTweets = [...tweets];
  let newTweet: FeedItemProps = {
    ...user,
    content: message,
  };
  newTweets.unshift(newTweet);
  return newTweets;
}

export function Tweet({ closeModal = null }: TweetProps) {
  const [state, dispatch] = useReducer(tweetReducer, tweetState);
  let { user } = useAppUser();

  let tweets = useStore((state) => state.json);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let inputValue = e.target.value;
    dispatch({ type: 'HANDLE_TWEET_CHANGE', tweetValue: inputValue });
  };

  const submitTweet = () => {
    if (!state.btnIsDisabled && user) {
      let newTweets = addNewTweet(user, state.tweetContent, tweets);
      api.setState({ json: newTweets });
      dispatch({ type: 'SUBMIT_TWEET' });
    }
  };

  return (
    <Flex
      direction='column'
      border={1}
      borderColor={colors.border}
      borderStyle='solid'
      boxSizing='content-box'
    >
      {user ? (
        <>
          <Stack isInline margin={2}>
            <Avatar src={user.avatarSrc} />
            <Textarea
              placeholder="What's happening?"
              resize='none'
              bg={colors.bg}
              color={colors.text}
              onChange={handleInputChange}
              value={state.tweetContent}
            ></Textarea>
          </Stack>
          <Stack margin={2}>
            <Box
              color={
                state.charCount > 180
                  ? colors.tweetCounterBad
                  : colors.tweetCounterOk
              }
              alignSelf='flex-end'
            >
              {state.charCount}
            </Box>
            <Button
              variantColor='blue'
              variant='solid'
              alignSelf='flex-end'
              isDisabled={state.btnIsDisabled}
              onClick={() => {
                submitTweet();
                if (closeModal) closeModal();
              }}
            >
              Tweet
            </Button>
          </Stack>
        </>
      ) : (
        <Spinner margin='0 auto' color={colors.spinner}></Spinner>
      )}
    </Flex>
  );
}

export function TweetModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        size='lg'
        onClick={onOpen}
        variantColor={colors.button}
        variant='solid'
        marginTop={10}
        width='100%'
        rounded='20px'
      >
        Tweet
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={colors.text} backgroundColor={colors.bg}>
            Tweet
          </ModalHeader>
          <ModalCloseButton color={colors.text} />
          <ModalBody backgroundColor={colors.bg}>
            <Tweet closeModal={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
