import { createContext, useState } from "react";

// Creating the context object
export const UserDataContext = createContext();

const UserDataProvider = (props) => {
  const expirationTime = parseInt(localStorage.getItem("expirationTime"));
  const [accessKey, setAccessKey] = useState(null);
  const [userType, setUserType] = useState(null);
  const [storeEmail, setStoreEmailInContext] = useState("");
  const [email, setUserEmailInContext] = useState("");
  const [name, setName] = useState("");
  const [userAccessKey, setUserAccessKey] = useState("");
  const [location, setLocation] = useState("");
  const [storeName, setStoreName] = useState("");
  const [type, setType] = useState("");
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(
    isNaN(expirationTime)
      ? false
      : expirationTime - Date.now() < 0 //3599997
      ? false
      : true
  );

  const contextValue = {
    userIsAuthenticated,
    setUserIsAuthenticated,
    accessKey,
    setAccessKey,
    userType,
    setUserType,
    email,
    setUserEmailInContext,
    name,
    setName,
    userAccessKey,
    setUserAccessKey,
    storeEmail,
    setStoreEmailInContext,
    location,
    setLocation,
    storeName,
    setStoreName,
    type,
    setType,
  };
  return (
    <UserDataContext.Provider value={contextValue}>
      {props.children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
