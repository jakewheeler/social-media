export interface User {
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

export interface Users {
  results: User[];
}

export type FeedItemProps = {
  avatarSrc: string;
  name: string;
  handle: string;
  content?: string;
  uuid?: string;
}

export interface HnStory {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

export interface KanyeQuote {
  quote: string;
}

export interface Set {
  json: FeedItemProps[];
  fetch: () => void;
}
