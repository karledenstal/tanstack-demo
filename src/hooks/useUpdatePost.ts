import { useMutation } from '@tanstack/react-query';

interface UpdatePostArgs {
  title: string;
  body: string;
}

export const useUpdatePost = (id: string, body: UpdatePostArgs) => {
  return useMutation({
    mutationFn: async () => {
      return await fetch(`https://dummyjson.com/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    },
  });
};
