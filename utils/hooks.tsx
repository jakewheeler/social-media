import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { Users } from '../interfaces/users';
import { createFeedItem } from '../pages/index';
import axios from 'axios';
import { FeedItemProps } from '../components/Feed';
import { User } from '../interfaces/users';
import { TIMELINE_KEY } from './constants';

export function useSeed() {
  const [seed, setSeed] = useState<string | null>(null);

  useEffect(() => {
    setSeed(localStorage.getItem('seed'));
  }, [setSeed]);

  return { seed, setSeed };
}

export function useAppUser() {
  let { data: user, error } = useSWR<FeedItemProps, Error>('user', () =>
    createAppUser('someSeed')
  );

  return { user, error };
}

// export function useFeed() {
//   let { data: tweets, error, mutate } = useSWR<FeedItemProps[], Error>(
//     TIMELINE_KEY,
//     fetchInitialFeedContent,
//     { revalidateOnFocus: false}
//   );

//   return { tweets, error, mutate };
// }

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
  let users = await axios.get<Users>(TIMELINE_KEY);
  return users.data;
}

export async function fetchInitialFeedContent(): Promise<FeedItemProps[]> {
  let users = await fetchUsers();
  return Promise.all(users.results.map((feedItem) => createFeedItem(feedItem)));
}
