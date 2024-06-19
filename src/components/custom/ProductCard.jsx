import { Card, Image, CardFooter, Button } from "@nextui-org/react";
import { Badge } from "@/components/ui/badge";

const ProductCard = ({
  description,
  imageUrl,
  productPrice,
  product,
  accessKey, // This will not be used as per your request
}) => {
  return (
    <Card
      isFooterBlurred
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
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
