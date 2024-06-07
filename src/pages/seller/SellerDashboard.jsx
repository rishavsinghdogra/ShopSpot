import AddNewProduct from "./AddNewProduct";

export default function SellerDashboard({ storeName, storeEmail, accessKey }) {
  return (
    <div className="bg-gradient-to-r from-[#7882f3] to-[#5555ee] min-h-screen">
      
      <AddNewProduct
        className={"max-w-[50%] relative left-20 top-6 rounded-lg"}
      />
    </div>
  );
}
