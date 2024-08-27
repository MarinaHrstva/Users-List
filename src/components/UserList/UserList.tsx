import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Collapse } from "antd";

import { getUsers } from "../../state/usersSlice";
import { AppDispatch, RootState } from "../../state/store";

function UserList(): JSX.Element {
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );

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
              <p>{`Username: ${user.name}`}</p>
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
}

export default UserList;
