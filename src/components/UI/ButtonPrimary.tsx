type Props = {
  onClick?: (e: any) => void;
  children: string;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  disable?: boolean;
};

function ButtonPrimary({
  onClick,
  children,
  className,
  type,
  disable,
}: Props): JSX.Element {
  return (
    <button
      className={`btn-main ${className} ${disable && 'disable-btn'}`}
      onClick={onClick}
      type={type || "button"}
      disabled={disable}
    >
      {children}
    </button>
  );
}

export default ButtonPrimary;
