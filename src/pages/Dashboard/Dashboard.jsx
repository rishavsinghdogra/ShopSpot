import { useContext, useState } from "react";
import { UserDataContext } from "@/contexts/UserDataContext";
import SellerDashboard from "../seller/SellerDashboard";
import Sidebar from "@/layout/Sidebar";
import Home from "../common/home/Home";
import Cart from "../buyer/cart/Cart";
import Customers from "../seller/customers/Customers";
import SellerAnalytics from "../seller/analytics/SellerAnalytics";
import Orders from "../buyer/orders/Orders";
import BuyersAnalytics from "../buyer/analytics/buyersAnalytics";

const Dashboard = () => {
  const { type, storeName, storeEmail, accessKey } =
    useContext(UserDataContext);
  console.log("type of user from context :", type);
  const [selectedComponent, setSelectedComponent] = useState(
    type === "seller" ? "/dashboard" : "/home"
  );

  return (
    <>
      {type === "seller" ? (
        <div className="bg-gradient-to-r from-[#7882f3] to-[#5555ee] min-h-screen">
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
            <Home />
          ) : selectedComponent === "/my-customers" ? (
            <Customers />
          ) : (
            <SellerAnalytics />
          )}
        </div>
      ) : (
        <div className="bg-gradient-to-r from-[#7882f3] to-[#5555ee] min-h-screen">
          <Sidebar
            userType="buyer"
            selectedComponent={selectedComponent}
            setSelectedComponent={setSelectedComponent}
          />
          {selectedComponent === "/home" ? (
            <Home />
          ) : selectedComponent === "/cart" ? (
            <Cart />
          ) : selectedComponent === "/orders" ? (
            <Orders />
          ) : (
            <BuyersAnalytics />
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
