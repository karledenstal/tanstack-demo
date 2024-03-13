import { useMutation } from "@tanstack/react-query";

interface CreatePostArgs {
  title: string;
  body: string;
  userId: number;
}

export const useCreatePost = () => {
  return useMutation({
    mutationFn: async (body: CreatePostArgs) => {
      return await fetch('https://dummyjson.com/posts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    },
  });
}