import { createContext, useState, useEffect } from "react";

// Creating the context object
export const UserDataContext = createContext();

const UserDataProvider = (props) => {
  // Retrieve initial state from localStorage
  const getInitialState = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  };

  const [accessKey, setAccessKey] = useState(() =>
    getInitialState("accessKey", "")
  );
  const [storeEmail, setStoreEmailInContext] = useState(() =>
    getInitialState("storeEmail", "")
  );
  const [email, setUserEmailInContext] = useState(() =>
    getInitialState("email", "")
  );
  const [name, setName] = useState(() => getInitialState("name", ""));
  const [userAccessKey, setUserAccessKey] = useState(() =>
    getInitialState("userAccessKey", "")
  );
  const [location, setLocation] = useState(() =>
    getInitialState("location", "")
  );
  const [storeName, setStoreName] = useState(() =>
    getInitialState("storeName", "")
  );
  const [type, setType] = useState(() => getInitialState("type", ""));

  const expirationTime = parseInt(localStorage.getItem("expirationTime"));
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(
    isNaN(expirationTime)
      ? false
      : expirationTime - Date.now() < 0
      ? false
      : true
  );
  console.log(userIsAuthenticated, expirationTime);

  localStorage.setItem("accessKey", JSON.stringify(accessKey));
  localStorage.setItem("storeEmail", JSON.stringify(storeEmail));
  localStorage.setItem("email", JSON.stringify(email));
  localStorage.setItem("name", JSON.stringify(name));
  localStorage.setItem("userAccessKey", JSON.stringify(userAccessKey));
  localStorage.setItem("location", JSON.stringify(location));
  localStorage.setItem("storeName", JSON.stringify(storeName));
  localStorage.setItem("type", JSON.stringify(type));


  const[currentStore, setCurrentStore] = useState({
    name : "",
    accessKey : "",
  })

  const contextValue = {
    userIsAuthenticated,
    setUserIsAuthenticated,
    accessKey,
    setAccessKey,
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
    currentStore,
    setCurrentStore,
  };

  return (
    <UserDataContext.Provider value={contextValue}>
      {props.children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
