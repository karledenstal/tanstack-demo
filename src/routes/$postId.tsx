import { createFileRoute } from '@tanstack/react-router';
import { Post, User } from '../types';

export const PostComponent = () => {
  const data = Route.useLoaderData();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-bold">{data?.post?.title}</h1>
        <p className="text-zinc-500 font-mono text-xs">
          Written by {data?.user?.firstName} {data?.user?.lastName}
        </p>
      </div>
      <p className="text-xl">{data?.post?.body}</p>
    </div>
  );
};

export const Route = createFileRoute('/$postId')({
  component: PostComponent,
  loader: async ({ params }) => {
    const postRes = await fetch(`https://dummyjson.com/posts/${params.postId}`);
    const post: Post = await postRes.json();

    const userRes = await fetch(`https://dummyjson.com/users/${post.userId}`);
    const user: User = await userRes.json();

    return { post, user };
  },
});
