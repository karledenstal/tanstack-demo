import { createFileRoute } from '@tanstack/react-router';
import { Post, User } from '../types';
import { useState } from 'react';
import { store } from '../stores/store';
import { UpdatePostForm } from '../components/UpdatePostForm';

export const PostComponent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const data = Route.useLoaderData();

  const onEdit = () => {
    store.setState((state) => ({
      ...state,
      id: data?.post?.id.toString(),
      title: data?.post?.title,
      body: data?.post?.body,
    }));

    setIsEditing(true);
  };

  return (
    <>
      {isEditing ? (
        <UpdatePostForm />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-bold">{data?.post?.title}</h1>
            <p className="text-zinc-500 font-mono text-xs">
              Written by {data?.user?.firstName} {data?.user?.lastName}
              <button
                onClick={onEdit}
                className="inline-block ml-2 text-blue-500"
              >
                Edit
              </button>
            </p>
          </div>
          <p className="text-xl">{data?.post?.body}</p>
        </div>
      )}
    </>
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
