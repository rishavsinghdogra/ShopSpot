import { Button } from "@nextui-org/react";

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      image: "/placeholder.svg",
      name: "Acme Circles T-Shirt",
      quantity: 2,
      price: 19.99,
    },
    {
      id: 2,
      image: "/placeholder.svg",
      name: "Sunset Shades Sunglasses",
      quantity: 1,
      price: 29.99,
    },
    {
      id: 3,
      image: "/placeholder.svg",
      name: "Cool Breeze Portable Fan",
      quantity: 1,
      price: 14.99,
    },
  ];
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const removeFromCart = (id) => {};
  return (
    <div className=" w-[70%] mx-auto px-4 md:px-6 py-12">
      <div className="grid gap-6 md:gap-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid gap-1 text-slate-50">
            <h1 className="text-2xl font-bold tracking-tight">Your Cart</h1>
            <p className="text-muted-foreground">
              Review and manage the items in your cart.
            </p>
          </div>
          <div className="text-2xl font-bold ml-auto text-slate-50">
            Total: ${total.toFixed(2)}
          </div>
        </div>
        <div className="grid gap-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="grid bg-white md:grid-cols-[100px_1fr_auto] gap-4 items-center border rounded-lg p-4"
            >
              <img
                src="/placeholder.svg"
                alt={item.name}
                width={100}
                height={100}
                className="rounded-md object-cover"
              />
              <div className="grid gap-1">
                <h3 className="font-semibold">{item.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    Qty: {item.quantity}
                  </span>
                  <span className="text-muted-foreground">
                    Price: ${item.price.toFixed(2)}
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeFromCart(item.id)}
                className = "bg-red-500 text-white font-semibold rounded-md"
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
