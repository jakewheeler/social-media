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
  ModalFooter,
  Divider,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/core';
import { ChangeEvent, useReducer } from 'react';
import { FeedItemProps } from '../components/Feed';
import { mutate } from 'swr';
import colors from '../utils/colors';

type TweetProps = {
  user: FeedItemProps;
  tweets: FeedItemProps[] | undefined;
  timelineKey: string;
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

export function Tweet({
  user,
  tweets,
  timelineKey,
  closeModal = null,
}: TweetProps) {
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
      mutate(timelineKey, newTweets, false);
      dispatch({ type: 'SUBMIT_TWEET' });
    }
  };

  const addNewTweet = () => {
    if (!tweets) return;
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
      borderColor={colors.border}
      borderStyle='solid'
      boxSizing='content-box'
    >
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
    </Flex>
  );
}

export function TweetModal({ user, tweets, timelineKey }: TweetProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        variantColor={colors.button}
        variant='solid'
        marginTop={10}
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
            <Tweet
              user={user}
              tweets={tweets}
              timelineKey={timelineKey}
              closeModal={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
