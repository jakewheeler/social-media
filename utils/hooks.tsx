import useSWR from 'swr';
import { FeedItemProps } from '../types';
import { createAppUser } from '../utils/helpers';
import { APP_USER_SEED } from '../utils/constants';

export function useAppUser() {
  let { data: user, error } = useSWR<FeedItemProps, Error>('user', () =>
    createAppUser(APP_USER_SEED)
  );

  return { user, error };
}
