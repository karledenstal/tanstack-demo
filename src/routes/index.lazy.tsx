import { Link, createLazyFileRoute } from '@tanstack/react-router';
import { useFetchPosts } from '../hooks/useFetchPosts';

const Index = () => {
  const { data, isLoading } = useFetchPosts();

  return (
    <div>
      {isLoading ? (
        'Loading...'
      ) : (
        <div className="flex flex-col gap-4">
          {data?.posts.map((post) => (
            <div
              className="rounded-md border border-zinc-800 p-4"
              key={post.id}
            >
              <h2 className="text-2xl font-semibold">
                <Link to="/$postId" params={{ postId: post.id.toString() }}>
                  {post.title}
                </Link>
              </h2>
              <p className="text-zinc-300">{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;

export const Route = createLazyFileRoute('/')({
  component: Index,
});
