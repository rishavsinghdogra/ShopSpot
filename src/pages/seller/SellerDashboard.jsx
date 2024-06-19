import AddNewProduct from "./AddNewProduct";

export default function SellerDashboard({ storeName, storeEmail, accessKey }) {
  return (
    <div className="">
      <AddNewProduct
        className={"max-w-[50%] relative left-20 top-6 rounded-lg"}
      />
    </div>
  );
}
