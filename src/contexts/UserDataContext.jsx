import { createContext, useState } from "react";
import { firebaseDb } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

// Creating the context object
export const UserDataContext = createContext();

const UserDataProvider = (props) => {
  const expirationTime = parseInt(localStorage.getItem("expirationTime"));

  const [userIsAuthenticated, setUserIsAuthenticated] = useState(
    isNaN(expirationTime)
      ? false
      : expirationTime - Date.now() < 0 //3599997
      ? false
      : true
  );

  const contextValue = { userIsAuthenticated, setUserIsAuthenticated};
  return (
    <UserDataContext.Provider value={contextValue}>
      {props.children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
