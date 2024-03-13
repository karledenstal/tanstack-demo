import { createFileRoute, useRouter } from '@tanstack/react-router';
import { Post, User } from '../types';
import { useState } from 'react';
import { PostForm } from '../components/PostForm';
import { store } from '../stores/store';
import { useUpdatePost } from '../hooks/useUpdatePost';

export const PostComponent = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState(null)
  const [isEditing, setIsEditing] = useState(false);
  const data = Route.useLoaderData();
  const { mutate } = useUpdatePost(data?.post?.id.toString(), {
    title: data?.post?.title,
    body: data?.post?.body,
  });

  const onFormSubmit = (values: { title: string; body: string }) => {
    setFormValues(values)
    mutate();
    setIsEditing(false);

    router.invalidate();
  };

  const onEdit = () => {
    store.setState(() => ({
      title: data?.post?.title,
      body: data?.post?.body,
    }));

    setIsEditing(true);
  };

  return (
    <>
      {isEditing ? (
        <PostForm buttonLabel="Save" />
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
