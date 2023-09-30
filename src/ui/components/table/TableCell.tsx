type Props = {
  children: React.ReactNode;
};

export const VuiTableCell = ({ children }: Props) => {
  return <div className="vuiTableCell">{children}</div>;
};
