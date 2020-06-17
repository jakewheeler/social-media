import useSWR from 'swr';
import { FeedItemProps } from '../types';
import { createAppUser } from '../utils/helpers';

export function useAppUser() {
  let { data: user, error } = useSWR<FeedItemProps, Error>('user', () =>
    createAppUser('someSeed')
  );

  return { user, error };
}
