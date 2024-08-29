import { useParams } from "react-router-dom";

import UserDetails from "../UserList/UserDetails";
import UserEditForm from "../UserList/UserEditForm";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "../../state/postsSlice";
import { AppDispatch, RootState } from "../../state/store";
import PostsDetails from "./PostsDetails";
import UserInfo from "../UserList/UserInfo";

function PostsList() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedUserPosts, error, loading } = useSelector(
    (state: RootState) => state.posts
  );

  const currentUser = useSelector(
    (state: RootState) =>
      state.users.users.filter((u) => u?.id && u?.id.toString() === id)[0]
  );

  useEffect(() => {
    if (id) {
      dispatch(getUserPosts(id));
    }
  }, [dispatch, id]);

  if (error) {
    return (
      <div className="error-message">
        Something went wrong :( Please try again!
      </div>
    );
  }

  if (loading) {
    return <div className="Loading">Loading...</div>;
  }

  return (
    <>
      <UserInfo user={currentUser} />
      <div className="posts-list">
        {selectedUserPosts.map((post) => (
          <PostsDetails post={post} />
        ))}
      </div>
    </>
  );
}

export default PostsList;
