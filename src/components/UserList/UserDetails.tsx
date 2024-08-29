import { User } from "../../state/usersSlice";

type Props = {
  user: User;
};

function UserDetails({ user }: Props) {
  return (
    <div className="user-details-container">
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>City: {user.address.city}</p>
      <p>Street: {user.address.street}</p>
      <p>Suite: {user.address.suite}</p>
    </div>
  );
}

export default UserDetails;
