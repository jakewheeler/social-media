import { User, Users, FeedItemProps, KanyeQuote } from '../types';
import axios from 'axios';
import { TIMELINE_KEY } from '../utils/constants';

export async function createFeedItem(person: User): Promise<FeedItemProps> {
  return {
    avatarSrc: person.picture.thumbnail,
    content: await fetchQuote(),
    handle: `@${person.login.username}`,
    name: `${person.name.first} ${person.name.last}`,
    uuid: person.login.uuid,
  };
}

export async function createAppUser(seed: string): Promise<FeedItemProps> {
  let tempUser = await fetchUserFromSeed(seed);
  let appUser = await createFeedItem(tempUser);
  return appUser;
}

export async function fetchUserFromSeed(seed: string): Promise<User> {
  let user = await axios.get<Users>(`https://randomuser.me/api/?seed=${seed}`);
  return user.data.results[0];
}

export async function fetchUsers(): Promise<Users> {
  let users = await axios.get<Users>(TIMELINE_KEY);
  return users.data;
}

export async function fetchInitialFeedContent(): Promise<FeedItemProps[]> {
  let users = await fetchUsers();
  return Promise.all(users.results.map((feedItem) => createFeedItem(feedItem)));
}

export async function fetchQuote(): Promise<string> {
  let url = `https://api.kanye.rest?nocache=${Math.random()}`;
  let req = await axios.get<KanyeQuote>(url);
  return req.data.quote;
}

export async function fetchUser(): Promise<User> {
  const url = 'https://randomuser.me/api/';
  let users = await axios.get<Users>(url);
  return users.data.results[0];
}


