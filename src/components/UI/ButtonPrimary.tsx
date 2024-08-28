type Props = {
  onClick: (e: any) => void;
  children: string;
  className?: string;
};

function ButtonPrimary({ onClick, children, className }: Props): JSX.Element {
  return (
    <button className={`btn-main ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default ButtonPrimary;
