import { SubmitHandler, useForm } from "react-hook-form";
import { useCallback } from "react";

import { Post, updatePost } from "../../state/postsSlice";
import ButtonPrimary from "../UI/ButtonPrimary";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";

type Props = {
  post: Post;
};

type Form = {
  title: string;
  body: string;
};

function EditPostForm({ post }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Form>({
    mode: "onBlur",
    defaultValues: {
      title: post.title,
      body: post.body,
    },
  });

  const dispatch = useDispatch<AppDispatch>();

  const onSubmitHandler: SubmitHandler<Form> = useCallback(
    async (data) => {
      dispatch(updatePost({ ...data, userId: post.userId, id: post.id }));
    },
    [dispatch, post.userId, post.id]
  );

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="form-item-container">
        <label htmlFor="title">Title: </label>
        <textarea
          {...register("title", { required: "Title is required" })}
          cols={40}
          rows={2}
        />
        {errors.title && (
          <p className="error-message">{errors.title.message}</p>
        )}
      </div>
      <div className="form-item-container">
        <label htmlFor="body">Body: </label>
        <textarea
          className=""
          cols={40}
          rows={10}
          {...register("body", { required: "Body is required" })}
        />
        {errors.body && <p className="error-message">{errors.body.message}</p>}
      </div>
      <ButtonPrimary className="btn-secondary" type="submit" disable={!isValid}>
        Submit
      </ButtonPrimary>
    </form>
  );
}

export default EditPostForm;
