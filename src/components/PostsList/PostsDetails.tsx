import { useCallback, useEffect, useState } from "react";
import { Popconfirm } from "antd";

import { deletePost, Post } from "../../state/postsSlice";
import ButtonPrimary from "../UI/ButtonPrimary";
import EditPostForm from "./EditPostForm";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";

type Props = {
  post: Post;
};

function PostsDetails({ post }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [shouldDelete, setShouldDelete] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  
  const onDeleteHandler = useCallback(() => {
    if (!shouldDelete) {
      return;
    }
    dispatch(deletePost(post.id));
    setShouldDelete(false);
  }, [dispatch, post.id, shouldDelete]);

  useEffect(() => {
    if (!shouldDelete) {
      return;
    }
    onDeleteHandler();
  }, [onDeleteHandler, shouldDelete]);


  return (
    <>
      <div className="post-container">
        {!isEditing && <h3 className="post-title">{post.title}</h3>}
        {!isEditing && <p className="post-body">{post.body}</p>}
        {isEditing && <EditPostForm post={post} />}
        <ButtonPrimary
          className="btn-primary"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit Post"}
        </ButtonPrimary>
        <Popconfirm
          title="Delete the post"
          description="Are you sure to delete this post?"
          onConfirm={() => setShouldDelete(true)}
          onCancel={() => setShouldDelete(false)}
          okText="Yes"
          cancelText="No"
        >
          <ButtonPrimary className="btn-primary" onClick={onDeleteHandler}>
            Delete
          </ButtonPrimary>
        </Popconfirm>
      </div>
    </>
  );
}

export default PostsDetails;
