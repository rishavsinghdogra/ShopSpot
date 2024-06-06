import Sidebar from "@/layout/Sidebar";
const BuyerDashboard = ({ name, email, accessKey }) => {
  return (
    <div>
      <Sidebar userType="buyer" />
      Buyer Dashboard
    </div>
  );
};

export default BuyerDashboard;
