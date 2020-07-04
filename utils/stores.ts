import create from 'zustand';
import { FeedItemProps } from '../types';
import { fetchInitialFeedContent } from './helpers';
interface Set {
  json: FeedItemProps[];
  fetch: (url: string) => void;
}

export const [useStore, api] = create<Set>(
  (set): Set => ({
    json: [],
    fetch: async (url: string) => {
      try {
        const response = await fetchInitialFeedContent();
        set({ json: response });
      } catch (err) {
        console.error('Couldn not fetch initial data');
        set({ json: [] });
      }
    },
  })
);
