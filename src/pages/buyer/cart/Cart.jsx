import { Button } from "@nextui-org/react";
import { useEffect, useState, useContext } from "react";
import { fetchCartData, deleteCartItem } from "@/utils/Utils";
import { UserDataContext } from "@/contexts/UserDataContext";
import { toast } from "react-toastify";
import { ShoppingBag } from "lucide-react";
import { addDoc, collection } from "firebase/firestore";
import { firebaseDb } from "@/firebase";

const Cart = ({ accessKey }) => {
  const [cartData, setCartData] = useState([]);
  const [refetch, setRefetch] = useState(1); // to trigger  a rerender on deletion
  const {
    accessKey: userAccessKey,
    name,
    email,
    storeName,
    storeEmail,
    type,
    currentStore,
  } = useContext(UserDataContext);

  console.log(cartData);

  useEffect(() => {
    fetchCartData(userAccessKey)
      .then((data) => {
        setCartData(data);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }, [userAccessKey, refetch]);

  const total = cartData?.reduce(
    (acc, item) => acc + item?.productPrice * (item?.quantity || 1),
    0
  );

  if (!cartData[0]) {
    return (
      <div className=" h-screen  text-6xl font-extrabold text-white flex flex-col items-center justify-center">
        <h1>Oops! Your cart is empty</h1>
        <img src="./images/emptyCart.png" alt="Your Cart is empty" />
      </div>
    );
  }

  return (
    <div className="w-[70%] mx-auto px-4 md:px-6 py-12">
      <div className="grid gap-6 md:gap-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid gap-1 text-slate-50">
            <h1 className="text-2xl font-bold tracking-tight">Your Cart</h1>
            <p className="text-muted-foreground">
              Review and manage the items in your cart.
            </p>
          </div>
          <div className="text-2xl font-bold ml-auto text-slate-50">
            Total: ₹{total?.toFixed(2)}
          </div>
        </div>
        <div className="grid gap-6">
          {cartData?.map((item, index) => (
            <div
              key={index}
              className="grid bg-white md:grid-cols-[100px_1fr_auto] gap-4 items-center border rounded-lg p-4"
            >
              <img
                src={item?.imageUrl}
                alt={item?.product}
                width={100}
                height={100}
                className="rounded-md object-cover h-20"
              />
              <div className="grid gap-1">
                <h3 className="font-semibold">{item?.product}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">
                      Price: ₹{item?.productPrice}
                    </span>
                    <span className="text-muted-foreground font-semibold">
                      From: {item?.store}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                className="relative top-7 bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 px-4 rounded-md hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition duration-300"
                endContent={
                  <ShoppingBag className=" group-hover:animate-bounce" />
                }
                onClick={async () => {
                  console.log("eye ", accessKey);
                  console.log(`seller/${accessKey}/orders`);
                  await addDoc(
                    collection(
                      firebaseDb,
                      `seller/${
                        type === "seller" ? accessKey : currentStore?.accessKey
                      }/orders`
                    ),
                    {
                      // New product order is added here in the cart collection of the seller
                      product: item?.product,
                      imageUrl: item.imageUrl,
                      productPrice: Number(item?.productPrice),
                      description: item?.description,
                      buyerName: type === "seller" ? storeName : name,
                      buyerEmail: type === "seller" ? storeEmail : email,
                    }
                  ).then(async () => {
                    toast.success("Product Order Placed Successfully ");
                    await deleteCartItem(userAccessKey, item?.accessKey);
                    setRefetch(refetch + 1);
                  });
                }}
              >
                Buy now
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={async () => {
                  await deleteCartItem(userAccessKey, item?.accessKey).then(
                    () => {
                      setRefetch(refetch + 1);
                      toast.success("Item removed from cart successfully!");
                    }
                  );
                }}
                className="bg-red-500 text-white font-semibold rounded-md"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
