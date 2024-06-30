import AddNewProduct from "./AddNewProduct";
import Orders from "../buyer/orders/Orders";

export default function SellerDashboard({ storeName, storeEmail, accessKey }) {
  return (
    <div className=" flex flex-col items-center justify-center ">
      <AddNewProduct
        className={" sm:w-[67%] m-8 sm:mt-8"}
      />
      <Orders />
    </div>
  );
}
