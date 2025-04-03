import React, { createContext, useState, useContext } from "react";

// Create the context
const AccountContext = createContext();

// Provider component to wrap the app with context
export const AccountProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <AccountContext.Provider value={{ userEmail, setUserEmail, userLoggedIn, setUserLoggedIn, userName, setUserName }}>
      {children}
    </AccountContext.Provider>
  );
};

// Custom hook to use the AccountContext
export const useAccount = () => useContext(AccountContext);

