const ListItem = ({ children }) => {
  return (
    <div className="min-h-[70px] rounded-lg my-4 flex items-center pl-5 border bg-card shadow-sm">
      {children}
    </div>
  );
};

export default ListItem;
