import {
  Box,
  Flex,
  Input,
  Stack,
  Button,
  Text,
  Heading,
} from '@chakra-ui/core';
import colors from '../utils/colors';
import Typist from 'react-typist';
import { ChangeEvent, KeyboardEvent } from 'react';
import Router from 'next/router';
import { useSeed } from '../utils/hooks';

export default function Seed() {
  const { seed, setSeed } = useSeed();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let inputValue = e.target.value;
    setSeed(inputValue);
  };

  const setUserSeed = () => {
    if (seed) {
      localStorage.setItem('seed', seed);
      setSeed(seed);
      Router.push('/');
    } else {
      console.error('Must select a seed');
    }
  };

  return (
    <Flex
      flexDir='column'
      alignItems='center'
      justifyContent='center'
      marginTop={10}
    >
      <Heading marginBottom={50} color='white'>
        Social Media
      </Heading>
      <Stack textAlign='center'>
        <Text as={Typist} color={colors.text}>
          Who are you?
        </Text>
        <Input
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') setUserSeed();
          }}
          onChange={handleInputChange}
          placeholder='Enter a seed'
        />
        <Button onClick={setUserSeed} variantColor={colors.button}>
          Login
        </Button>
      </Stack>
    </Flex>
  );
}
