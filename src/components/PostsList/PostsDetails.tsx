import { Post } from "../../state/postsSlice";

type Props = {
  post: Post;
};

function PostsDetails({ post }: Props) {
  return (
    <>
      <div className="post-container">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-body">{post.body}</p>
      </div>
    </>
  );
}

export default PostsDetails;
