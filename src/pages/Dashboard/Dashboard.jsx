import { useContext, useState } from "react";
import { UserDataContext } from "@/contexts/UserDataContext";
import SellerDashboard from "../seller/SellerDashboard";
import Sidebar from "@/layout/Sidebar";
import Home from "../common/home/Home";
import Cart from "../buyer/cart/Cart";
import SellerAnalytics from "../seller/analytics/SellerAnalytics";


const Dashboard = () => {
  const { type, storeName, storeEmail, accessKey } =
    useContext(UserDataContext);
  console.log("type of user from context :", type);
  const [selectedComponent, setSelectedComponent] = useState(
    type === "seller" ? "/dashboard" : "/home"
  );
  const [otherStoreAccessKey, setOtherStoreAccessKey] = useState(null);

  return (
    <>
      {type === "seller" ? (
        <div
          style={{
            backgroundImage: "url('/images/backgroundImagee.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
          }}
        >
          <Sidebar
            userType="seller"
            selectedComponent={selectedComponent}
            setSelectedComponent={setSelectedComponent}
          />
          {selectedComponent === "/dashboard" ? (
            <SellerDashboard
              storeName={storeName}
              storeEmail={storeEmail}
              accessKey={accessKey}
            />
          ) : selectedComponent === "/home" ? (
            <Home
              setSelectedComponent={setSelectedComponent}
              setOtherStoreAccessKey={setOtherStoreAccessKey}
            />
          ) : selectedComponent === "/cart" ? (
            <Cart accessKey={otherStoreAccessKey} />
          ) : (
            <SellerAnalytics
              accessKey={accessKey}
              otherStoreAccessKey={otherStoreAccessKey}
            /> //Analytics related to sellers will be avaible to sellers as well so that they don't need to make a buyers account to havee seller experience
          )}
        </div>
      ) : (
        <div
          style={{
            backgroundImage: "url('/images/backgroundImagee.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
          }}
        >
          <Sidebar
            userType="buyer"
            selectedComponent={selectedComponent}
            setSelectedComponent={setSelectedComponent}
          />
          {selectedComponent === "/home" ? (
            <Home
              setSelectedComponent={setSelectedComponent}
              setOtherStoreAccessKey={setOtherStoreAccessKey}
            />
          ) : selectedComponent === "/cart" ? (
            <Cart />
          ) : (
            <SellerAnalytics
              accessKey={accessKey}
              otherStoreAccessKey={otherStoreAccessKey}
            /> //Analytics related to sellers will be avaible to buyers
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
