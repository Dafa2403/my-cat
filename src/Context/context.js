import React from "react";

export const UserContext = React.createContext();

export const UserSearch = () => {
  return React.useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [dataSearch, setDataSearch] = React.useState([]);
  return (
    <UserContext.Provider
      value={{
        dataSearch,
        setDataSearch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
