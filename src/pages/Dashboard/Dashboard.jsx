import { useContext } from "react";
import { UserDataContext } from "@/contexts/UserDataContext";
import BuyerDashboard from "../buyer/BuyerDashboard";
import SellerDashboard from "../seller/SellerDashboard";

const Dashboard = () => {
  const { type, storeName, storeEmail, accessKey, name, email } =
    useContext(UserDataContext);

  return (
    <>
      {type === "seller" ? (
        <SellerDashboard
          storeName={storeName}
          storeEmail={storeEmail}
          accessKey={accessKey}
        />
      ) : (
        <BuyerDashboard name={name} email={email} accessKey={accessKey} />
      )}
    </>
  );
};

export default Dashboard;
