import { useForm } from '@tanstack/react-form';
import { useStore } from '@tanstack/react-store';
import { store } from '../stores/store';
import { useUpdatePost } from '../hooks/useUpdatePost';
import { useRouter } from '@tanstack/react-router';

export const UpdatePostForm = () => {
  const { invalidate } = useRouter();
  const {
    title: defaultTitle,
    body: defaultBody,
    id,
  } = useStore(store, (state) => state);

  const form = useForm({
    defaultValues: {
      title: defaultTitle,
      body: defaultBody,
    },
    onSubmit: async ({ value }) => {
      mutate(value);

      invalidate();
    },
  });

  const { mutate } = useUpdatePost(id);

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
        Save
      </button>
    </form>
  );
};
