import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { Users } from '../interfaces/users';
import { createFeedItem } from '../pages/index';
import axios from 'axios';
import { FeedItemProps } from '../components/Feed';
import { User } from '../interfaces/users';

export function useSeed() {
  const [seed, setSeed] = useState<string | null>(null);

  useEffect(() => {
    setSeed(localStorage.getItem('seed'));
  }, [setSeed]);

  return { seed, setSeed };
}

export function useAppUser() {
  let { seed } = useSeed();

  let [user, setUser] = useState<FeedItemProps>();

  useEffect(() => {
    async function initUser(userSeed: string) {
      let createdUser = await createAppUser(userSeed);
      setUser(createdUser);
    }

    if (seed) {
      initUser(seed);
    }
  }, [seed, setUser]);

  return { user, setUser };
}

export function useFeed() {
  let { data: tweets, error, mutate } = useSWR<FeedItemProps[], Error>(
    'tweets',
    fetchInitialFeedContent
  );

  return { tweets, error, mutate };
}

async function createAppUser(seed: string): Promise<FeedItemProps> {
  let tempUser = await fetchUserFromSeed(seed);
  let appUser = await createFeedItem(tempUser);
  return appUser;
}

async function fetchUserFromSeed(seed: string): Promise<User> {
  let user = await axios.get<Users>(`https://randomuser.me/api/?seed=${seed}`);
  return user.data.results[0];
}

async function fetchUsers(): Promise<Users> {
  const url = 'https://randomuser.me/api/?results=35';
  let users = await axios.get<Users>(url);
  return users.data;
}

async function fetchInitialFeedContent(): Promise<FeedItemProps[]> {
  let users = await fetchUsers();
  return Promise.all(users.results.map((feedItem) => createFeedItem(feedItem)));
}
