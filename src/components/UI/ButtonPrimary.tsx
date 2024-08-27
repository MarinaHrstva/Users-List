import React from "react";

type Props = {
  onClick: () => void;
  children: string;
};

function ButtonPrimary({ onClick, children }: Props): JSX.Element {
  return <button className="btn-primary" onClick={onClick}>{children}</button>;
}

export default ButtonPrimary;
