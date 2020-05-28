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