import { useForm } from '@tanstack/react-form';
import { useStore } from '@tanstack/react-store';
import { store } from '../stores/store';
import { useCreatePost } from '../hooks/useCreatePost';

export const CreatePostForm = ({ buttonLabel = "Create" }: { buttonLabel?: string }) => {
  const { title: defaultTitle, body: defaultBody } = useStore(
    store,
    (state) => state
  );

  const { mutate } = useCreatePost();

  const form = useForm({
    defaultValues: {
      title: defaultTitle,
      body: defaultBody,
    },
    onSubmit: async ({ value }) => {
      mutate(value)
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
      className="flex flex-col space-y-4"
    >
      <form.Field
        name="title"
        children={(field) => (
          <label className="flex flex-col gap-2">
            Title
            <input
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="rounded-sm bg-zinc-900 border border-zinc-800 p-2 text-zinc-300"
            />
          </label>
        )}
      />
      <form.Field
        name="body"
        children={(field) => (
          <label className="flex flex-col gap-2">
            Body
            <textarea
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="rounded-sm bg-zinc-900 border border-zinc-800 p-2 text-zinc-300"
            />
          </label>
        )}
      />
      <button
        type="submit"
        className="rounded-sm bg-zinc-900 border border-zinc-800 p-2 text-zinc-300"
      >
        {buttonLabel}
      </button>
    </form>
  );
};
