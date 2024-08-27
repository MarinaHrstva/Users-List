import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "../../state/usersSlice";
import { AppDispatch } from "../../state/store";

function UserList() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return <div className="user-list-container">{}</div>;
}

export default UserList;
