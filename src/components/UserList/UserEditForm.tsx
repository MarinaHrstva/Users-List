import { Dispatch, SetStateAction, useState } from "react";
import { updateUser, User } from "../../state/usersSlice";
import ButtonPrimary from "../UI/ButtonPrimary";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";

type Props = {
  user: User;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

const addressDetails = ["city", "street", "suite"];

function UserEditForm({ user, setIsEditing }: Props): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const [userDetails, setUserDetails] = useState(user);

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (addressDetails.includes(name)) {
      const newAddress = {
        ...userDetails.address,
        [name]: value,
      };
      setUserDetails({
        ...userDetails,
        address: {
          ...newAddress,
        },
      });
      return;
    }

    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  }

  async function submitHandler(e: { preventDefault: () => void }) {
    const areMainDetailsEmpty = Object.values(userDetails).some(
      (v) => v === ""
    );
    const areAddressDetailsEmpty = Object.values(userDetails.address).some(
      (v) => v === ""
    );

    if (areMainDetailsEmpty || areAddressDetailsEmpty) {
      alert("All fields are required! Please fill in all fields!");
      return;
    }

    e.preventDefault();
    await dispatch(updateUser(userDetails));
    setIsEditing(false);
  }

  return (
    <>
      <form action="" className="user-details-form">
        <input
          type="text"
          name="username"
          value={userDetails.username}
          onChange={onChangeHandler}
        ></input>
        <input
          type="text"
          name="email"
          value={userDetails.email}
          onChange={onChangeHandler}
        ></input>
        <input
          type="text"
          name="city"
          value={userDetails.address.city}
          onChange={onChangeHandler}
        ></input>
        <input
          type="text"
          name="street"
          value={userDetails.address.street}
          onChange={onChangeHandler}
        ></input>
        <input
          type="text"
          name="suite"
          value={userDetails.address.suite}
          onChange={onChangeHandler}
        ></input>
        <ButtonPrimary
          className="btn-secondary"
          onClick={(e) => submitHandler(e)}
        >
          Submit
        </ButtonPrimary>
      </form>
    </>
  );
}

export default UserEditForm;
