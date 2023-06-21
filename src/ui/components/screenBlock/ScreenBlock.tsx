type Props = {
  onClick?: () => void;
  children: React.ReactNode;
};

export const VuiScreenBlock = ({ onClick, children }: Props) => {
  return (
    <div className="vuiScreenBlock">
      {children}
      <div className="vuiScreenBlock__mask" onClick={onClick} />
    </div>
  );
};
