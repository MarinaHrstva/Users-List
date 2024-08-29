import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import UserDetails from "./UserDetails";
import UserEditForm from "./UserEditForm";
import ButtonPrimary from "../UI/ButtonPrimary";
import { User } from "../../state/usersSlice";

type Props = {
  user: User;
  isFromPosts?: boolean;
};

function UserInfo({ user, isFromPosts }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();

  const seePostsHandler = useCallback(
    (user: User) => {
      navigate(`/users/${user.id}/posts`);
    },
    [navigate]
  );

  return (
    <>
      {isEditing ? (
        <UserEditForm
          user={user}
          setIsEditing={setIsEditing}
          isFromPosts={isFromPosts}
        />
      ) : (
        <UserDetails user={user} />
      )}
      <div className="btn-container">
        <ButtonPrimary
          className="btn-primary"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit"}
        </ButtonPrimary>
        {!id && (
          <ButtonPrimary
            className="btn-secondary"
            onClick={() => seePostsHandler(user)}
          >
            See Posts
          </ButtonPrimary>
        )}
      </div>
    </>
  );
}

export default UserInfo;
