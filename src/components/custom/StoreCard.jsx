import { Card, Image, CardHeader, CardBody } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

const StoreCard = ({ location, storeName, email, setSelectedComponent }) => {
  return (
    <Card className="py-4 bg-fuchsia-50 ml-2  mt-3 rounded-xl shadow-xl hover:scale-105 transition-all ease-in">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold ">{storeName}</p>

        <div>
          <small className="text-default-500 font-bold text-green-800 bg-green-200 px-1 rounded-md ">
            {location}
          </small>
          <h4 className="text-sm bg-green-50 rounded-md font-bold text-blue-400 px-1">
            {email}
          </h4>
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl ml-9"
          src="public/images/shop.png"
          width={100}
        />
        <Button onClick={() => setSelectedComponent("/analytics") } className="mt-2 font-bold text-gray-50 rounded-lg bg-slate-900 ">
          Checkout
        </Button>
      </CardBody>
    </Card>
  );
};

export default StoreCard;
