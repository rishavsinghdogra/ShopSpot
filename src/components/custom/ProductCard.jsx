import { Card, Image, CardFooter, Button } from "@nextui-org/react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ShoppingBag, BaggageClaim } from "lucide-react";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { firebaseDb } from "@/firebase";
import { useState, useContext } from "react";
import { UserDataContext } from "@/contexts/UserDataContext";

const ProductCard = ({
  description,
  imageUrl,
  productPrice,
  product,
  accessKey,
  currentStore
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(false)
  const [refetch, setRefetch] = useState(1)
  const { accessKey: userAccessKey, name, email, storeName, storeEmail, type } = useContext(UserDataContext);
  // console.log("context ki cheeze", name, email, storeName, storeEmail, type)
  // console.log("user access key: ", userAccessKey);

  const handleBuyNow = async () => {
    setIsLoading(true);

    await addDoc(collection(firebaseDb, `seller/${accessKey}/orders`), {
      // New product is added here in the cart collection of the user
      product: product,
      imageUrl: imageUrl,
      productPrice: Number(productPrice),
      description: description,
      buyerName : (type === "seller" ? storeName : name),
      buyerEmail: (type === "seller" ? storeEmail : email),
      
    }).then(() => {
      setIsLoading(false);
      setRefetch(refetch+1)
      toast.success("Product Order Placed Successfully");
    });
  };

  const handleAddToCart = async () => {
    setIsCartLoading(true);
    await addDoc(collection(firebaseDb, `buyer/${userAccessKey}/cart`), {
      //New product is added here in the products collection of the store
      product: product,
      imageUrl: imageUrl,
      productPrice: Number(productPrice),
      description: description,
      store: currentStore?.name,
    }).then(() => {
      setIsCartLoading(false);
      toast.success("Product added to cart");
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          isFooterBlurred
          isPressable
          className="max-w-[150px] max-h-[150px] bg-slate-50 rounded-xl "
        >
          <div className="">
            <h5 className="text-md font-semibold text-center  truncate px-1">
              {product}
            </h5>
          </div>

          <Image
            alt={`Image of ${product}`}
            className=" object-contain flex items-center justify-center p-3 rounded-md "
            src={imageUrl}
          />

          <CardFooter className="flex space-x-2 bg-blue-300/70 border border-white/20 rounded-xl py-1 shadow-sm absolute bottom-1 left-1 right-1 z-10 ">
            <Badge variant="destructive">{`₹${productPrice}`}</Badge>
            <Button
              className="text-xs px-2 text-white bg-black/70 rounded-lg"
              variant="flat"
              color="default"
              radius="xl"
              size="sm"
              onClick={handleAddToCart}
              isLoading={isCartLoading}
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="min-w-[90%] min-h-[90%]">
        <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
          <div className="absolute top-[-20%]  transform -translate-x-1/2 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full animate-float"></div>
          <div className="absolute top-[-10%]  transform -translate-x-1/2 w-60 h-60 bg-gradient-to-br from-purple-400 to-blue-600 rounded-full animate-float-slower"></div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
          <div className="absolute bottom-[-20%] right-[-150px]  transform -translate-x-1 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full "></div>
          <div className="absolute bottom-[-10%] right-[-150px] transform -translate-x-1 w-60 h-60 bg-gradient-to-br from-purple-400 to-blue-600 rounded-full "></div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
          <div className="absolute top-[-20%] right-[-10px]  transform -translate-x-1 w-80 h-80 bg-gradient-to-br  from-orange-500 to-red-500 rounded-full "></div>
          <div className="absolute bottom-[6%] left-[-30px] transform -translate-x-1 w-40 h-40 bg-gradient-to-br  from-orange-500 to-red-500 rounded-full "></div>
        </div>

        <DialogHeader>
          <DialogTitle className=" text-[70px] mx-auto">{product}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-5 gap-1 py-4">
          <img
            src={imageUrl}
            alt=""
            className="mx-auto relative bottom-4 rounded-lg"
          />
          <DialogDescription className="mx-auto col-span-3 mt-3 ml-2 flex flex-col">
            {description}
            <Badge
              className="max-w-[20%] min-h-[20%] mt-3 text-5xl rounded-xl "
              variant="destructive"
            >{`₹${productPrice?.toLocaleString() ?? "N/A"}`}</Badge>
          </DialogDescription>
        </div>
        <DialogFooter>
          <Button
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 px-4 rounded-md hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition duration-300"
            endContent={<ShoppingBag className=" group-hover:animate-bounce" />}
            onClick={handleBuyNow}
            isLoading={isLoading}
          >
            Buy now
          </Button>
          <Button
            className="bg-gradient-to-r from-orange-500 to-red-500   text-white py-2 px-4 rounded-md hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-600 transition duration-300"
            endContent={
              <BaggageClaim className=" group-hover:animate-bounce" />
            }
            onClick={handleAddToCart}
            isLoading={isCartLoading}
          >
            Add to cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductCard;

