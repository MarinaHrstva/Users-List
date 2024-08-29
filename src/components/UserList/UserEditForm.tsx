import { useDispatch } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";

import { updateUser, User } from "../../state/usersSlice";
import ButtonPrimary from "../UI/ButtonPrimary";
import { AppDispatch } from "../../state/store";

type Props = {
  user: User;
};

type Form = {
  name: string;
  username: string;
  email: string;
  address: {
    city: string;
    street: string;
    suite: string;
  };
};

function UserEditForm({ user }: Props): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Form>({
    mode: "onBlur",
    defaultValues: {
      name: user.name,
      username: user.username,
      email: user.email,
      address: {
        city: user.address.city,
        street: user.address.street,
        suite: user.address.suite,
      },
    },
  });

  const onSubmitHandler: SubmitHandler<Form> = async (data) => {
    dispatch(updateUser({ ...data, id: user.id }));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="user-details-form"
    >
      <div className="form-item-container">
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          {...register("name", {
            required: "Name is required",
          })}
        />
        {errors.name && (
          <p className="error-message">{errors?.name?.message}</p>
        )}
      </div>
      <div className="form-item-container">
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          {...register("username", {
            required: "Username is required",
          })}
        />
        {errors.username && (
          <p className="error-message">{errors.username.message}</p>
        )}
      </div>
      <div className="form-item-container">
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          {...register("email", {
            required: "Email is required",
          })}
        />
        {errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}
      </div>
      <div className="form-item-container">
        <label htmlFor="address.city">City: </label>
        <input
          type="text"
          {...register("address.city", {
            required: "City is required",
          })}
        />
        {errors.address?.city && (
          <p className="error-message"> {errors.address.city.message}</p>
        )}
      </div>
      <div className="form-item-container">
        <label htmlFor="address.street">Street: </label>
        <input
          type="text"
          {...register("address.street", {
            required: "Street is required",
          })}
        />
        {errors.address?.street && (
          <p className="error-message">{errors.address.street.message}</p>
        )}
      </div>
      <div className="form-item-container">
        <label htmlFor="address.suite">Suite: </label>
        <input
          id="suite"
          type="text"
          {...register("address.suite", {
            required: "Suite is required",
          })}
        />
        {errors.address?.suite && (
          <p className="error-message">{errors.address.suite.message}</p>
        )}
      </div>
      <ButtonPrimary className="btn-secondary" type="submit" disable={!isValid}>
        Submit
      </ButtonPrimary>
    </form>
  );
}

export default UserEditForm;
