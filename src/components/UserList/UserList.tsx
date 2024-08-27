import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Collapse } from "antd";

import { getUsers } from "../../state/usersSlice";
import { AppDispatch, RootState } from "../../state/store";
import UserDetails from "./UserDetails";
import UserEditForm from "./UserEditForm";
import ButtonPrimary from "../UI/ButtonPrimary";

function UserList(): JSX.Element {
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { Panel } = Collapse;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

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
    <div className="user-list-container">
      <Collapse>
        {users.map((user) => {
          return (
            <Panel key={user.id} header={user.name}>
              {isEditing ? <UserEditForm /> : <UserDetails user={user} />}
              <ButtonPrimary onClick={() => setIsEditing(!isEditing)}>
                Edit
              </ButtonPrimary>
              <ButtonPrimary onClick={() => setIsEditing(false)}>
                Cancel
              </ButtonPrimary>
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
}

export default UserList;
