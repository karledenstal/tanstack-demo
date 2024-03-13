import { useMutation } from '@tanstack/react-query';

interface UpdatePostArgs {
  title: string;
  body: string;
}

export const useUpdatePost = (id: string) => {
  return useMutation({
    mutationFn: async (body: UpdatePostArgs) => {
      return await fetch(`https://dummyjson.com/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    },
  });
};
