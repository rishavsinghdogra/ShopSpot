import AddNewProduct from "./AddNewProduct";
import Orders from "../buyer/orders/Orders";

export default function SellerDashboard({ storeName, storeEmail, accessKey }) {
  return (
    <div className=" flex flex-col items-center justify-center">
      <AddNewProduct
        className={" w-[80%] relative left-6 top-9 rounded-lg "}
      />
      <Orders />
    </div>
  );
}
