import { createContext, useState } from "react";
import { firebaseDb } from "@/firebase";
import { query, collection, where, getDocs } from "firebase/firestore";

// Creating the context object
export const UserDataContext = createContext();

const UserDataProvider = (props) => {
  const expirationTime = parseInt(localStorage.getItem("expirationTime"));

  const getUserData = async() => {
    const collectionRef = collection(firebaseDb,"seller")
    const q = query(collectionRef, where("email", "==", "payalStores@gmail.com"))
    const result = await getDocs(q)
    console.log("result", result)
  }

  console.log("functi", getUserData())

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
