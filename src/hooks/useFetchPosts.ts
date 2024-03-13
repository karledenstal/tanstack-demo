import { useQuery } from '@tanstack/react-query';
import { PostResponse } from '../types';

export const useFetchPosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await fetch('https://dummyjson.com/posts');
      const posts: PostResponse = await res.json();

      return posts;
    },
  });
};
