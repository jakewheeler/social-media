import create from 'zustand';
import { FeedItemProps, Set } from '../types';
import { fetchInitialFeedContent } from './helpers';


export const [useStore, api] = create<Set>(
  (set): Set => ({
    json: [],
    fetch: async () => {
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
