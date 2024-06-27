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
import { toast} from "react-toastify";
import { addDoc,collection } from "firebase/firestore";
import { firebaseDb } from "@/firebase";
import { useState } from "react";
import Dashboard from "@/pages/Dashboard/Dashboard";

const ProductCard = ({
  description,
  imageUrl,
  productPrice,
  product,
  accessKey, // This will not be used as per your request
}) => {

  const [isLoading, setIsLoading] = useState(false)

  const handleBuyNow = async () => {

    setIsLoading(true)

    await addDoc(collection(firebaseDb, `seller/${accessKey}/orders`), {
      //New product is added here in the products collection of the store
      product: product,
      imageUrl: imageUrl,
      productPrice: Number(productPrice),
      description: description,
    }).then(() => {
      setIsLoading(false)
      toast.success("Product Order Placed Successfully")
    }) 
    }

  

  const handleAddToCart = async () =>{

    await addDoc(collection(firebaseDb, `buyer/${accessKey}/orders`), {
      //New product is added here in the products collection of the store
      product: product,
      imageUrl: imageUrl,
      productPrice: Number(productPrice),
      description: description,
    }).then(() => toast.success("Product Order Placed Successfully"))

  }
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
            endContent={<BaggageClaim className=" group-hover:animate-spin" />}
            
          >
            Add to cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductCard;

// for product in card
{/* <Card className="w-full max-w-sm">
      <div className="grid grid-cols-[120px_1fr] gap-4">
        <img
          src="/placeholder.svg"
          alt="Product Image"
          width={120}
          height={120}
          className="aspect-square w-full rounded-md object-cover"
        />
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Acme Widgets</h3>
            <div className="text-2xl font-bold">$49.99</div>
          </div>
          <Button variant="outline" size="sm" className="w-full">
            <TrashIcon className="mr-2 h-4 w-4" />
            Remove from Cart
          </Button>
        </div>
      </div>
    </Card> */}

    // Add to cart Dashboard

    // const cartItems = [
    //   {
    //     id: 1,
    //     image: "/placeholder.svg",
    //     name: "Acme Circles T-Shirt",
    //     quantity: 2,
    //     price: 19.99,
    //   },
    //   {
    //     id: 2,
    //     image: "/placeholder.svg",
    //     name: "Sunset Shades Sunglasses",
    //     quantity: 1,
    //     price: 29.99,
    //   },
    //   {
    //     id: 3,
    //     image: "/placeholder.svg",
    //     name: "Cool Breeze Portable Fan",
    //     quantity: 1,
    //     price: 14.99,
    //   },
    // ]
    // const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    // const removeFromCart = (id) => {}
    // return (
    //   <div className="container px-4 md:px-6 py-12">
    //     <div className="grid gap-6 md:gap-8">
    //       <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
    //         <div className="grid gap-1">
    //           <h1 className="text-2xl font-bold tracking-tight">Your Cart</h1>
    //           <p className="text-muted-foreground">Review and manage the items in your cart.</p>
    //         </div>
    //         <div className="text-2xl font-bold ml-auto">Total: ${total.toFixed(2)}</div>
    //       </div>
    //       <div className="grid gap-6">
    //         {cartItems.map((item) => (
    //           <div key={item.id} className="grid md:grid-cols-[100px_1fr_auto] gap-4 items-center border rounded-lg p-4">
    //             <img
    //               src="/placeholder.svg"
    //               alt={item.name}
    //               width={100}
    //               height={100}
    //               className="rounded-md object-cover"
    //             />
    //             <div className="grid gap-1">
    //               <h3 className="font-semibold">{item.name}</h3>
    //               <div className="flex items-center gap-2">
    //                 <span className="text-muted-foreground">Qty: {item.quantity}</span>
    //                 <span className="text-muted-foreground">Price: ${item.price.toFixed(2)}</span>
    //               </div>
    //             </div>
    //             <Button variant="outline" size="sm" onClick={() => removeFromCart(item.id)}>
    //               Remove
    //             </Button>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>)


// Order components 

// const orders = [
//   {
//     id: "INV001",
//     date: "2023-06-01",
//     items: 2,
//     total: 150.99,
//     status: "Fulfilled",
//   },
//   {
//     id: "INV002",
//     date: "2023-05-15",
//     items: 1,
//     total: 49.99,
//     status: "Pending",
//   },
//   {
//     id: "INV003",
//     date: "2023-04-20",
//     items: 3,
//     total: 299.99,
//     status: "Fulfilled",
//   },
//   {
//     id: "INV004",
//     date: "2023-03-10",
//     items: 1,
//     total: 79.99,
//     status: "Refunded",
//   },
//   {
//     id: "INV005",
//     date: "2023-02-28",
//     items: 4,
//     total: 399.99,
//     status: "Fulfilled",
//   },
//   {
//     id: "INV006",
//     date: "2023-01-15",
//     items: 2,
//     total: 150.99,
//     status: "Fulfilled",
//   },
//   {
//     id: "INV007",
//     date: "2022-12-01",
//     items: 1,
//     total: 49.99,
//     status: "Pending",
//   },
//   {
//     id: "INV008",
//     date: "2022-11-20",
//     items: 3,
//     total: 299.99,
//     status: "Fulfilled",
//   },
//   {
//     id: "INV009",
//     date: "2022-10-10",
//     items: 1,
//     total: 79.99,
//     status: "Refunded",
//   },
//   {
//     id: "INV010",
//     date: "2022-09-28",
//     items: 4,
//     total: 399.99,
//     status: "Fulfilled",
//   },
// ]
// const [sortColumn, setSortColumn] = useState("date")
// const [sortDirection, setSortDirection] = useState("desc")
// const [filteredOrders, setFilteredOrders] = useState(orders)
// const handleSort = (column) => {
//   if (sortColumn === column) {
//     setSortDirection(sortDirection === "asc" ? "desc" : "asc")
//   } else {
//     setSortColumn(column)
//     setSortDirection("asc")
//   }
// }
// const handleFilter = (status) => {
//   if (status === "all") {
//     setFilteredOrders(orders)
//   } else {
//     setFilteredOrders(orders.filter((order) => order.status === status))
//   }
// }
// const sortedOrders = useMemo(() => {
//   return filteredOrders.sort((a, b) => {
//     if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
//     if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
//     return 0
//   })
// }, [filteredOrders, sortColumn, sortDirection])
// const totalOrders = orders.length
// const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0)
// const averageOrderValue = totalRevenue / totalOrders
// return (
//   <div className="flex flex-col min-h-screen bg-muted/40">
//     <main className="flex-1 grid gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
//       <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
//         <Card>
//           <CardHeader className="pb-3">
//             <CardTitle>Your Orders</CardTitle>
//             <CardDescription className="max-w-lg text-balance leading-relaxed">
//               Introducing Our Dynamic Orders Dashboard for Seamless Management and Insightful Analysis.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead className="cursor-pointer" onClick={() => handleSort("id")}>
//                     Order #{sortColumn === "id" && <ChevronsUpDownIcon className="ml-2 w-4 h-4" />}
//                   </TableHead>
//                   <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
//                     Date
//                     {sortColumn === "date" && <ChevronsUpDownIcon className="ml-2 w-4 h-4" />}
//                   </TableHead>
//                   <TableHead className="cursor-pointer" onClick={() => handleSort("items")}>
//                     Items
//                     {sortColumn === "items" && <ChevronsUpDownIcon className="ml-2 w-4 h-4" />}
//                   </TableHead>
//                   <TableHead className="cursor-pointer" onClick={() => handleSort("total")}>
//                     Total
//                     {sortColumn === "total" && <ChevronsUpDownIcon className="ml-2 w-4 h-4" />}
//                   </TableHead>
//                   <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
//                     Status
//                     {sortColumn === "status" && <ChevronsUpDownIcon className="ml-2 w-4 h-4" />}
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {sortedOrders.map((order) => (
//                   <TableRow key={order.id}>
//                     <TableCell>{order.id}</TableCell>
//                     <TableCell>{order.date}</TableCell>
//                     <TableCell>{order.items}</TableCell>
//                     <TableCell>${order.total.toFixed(2)}</TableCell>
//                     <TableCell>
//                       <Badge
//                         className="text-xs"
//                         variant={
//                           order.status === "Fulfilled"
//                             ? "secondary"
//                             : order.status === "Pending"
//                             ? "outline"
//                             : "danger"
//                         }
//                       >
//                         {order.status}
//                       </Badge>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//           <CardFooter className="flex items-center justify-between">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
//                   <FilterIcon className="h-3.5 w-3.5" />
//                   <span>Filter</span>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuCheckboxItem
//                   checked={filteredOrders.length === orders.length}
//                   onCheckedChange={() => handleFilter("all")}
//                 >
//                   All
//                 </DropdownMenuCheckboxItem>
//                 <DropdownMenuCheckboxItem
//                   checked={filteredOrders.some((order) => order.status === "Fulfilled")}
//                   onCheckedChange={() => handleFilter("Fulfilled")}
//                 >
//                   Fulfilled
//                 </DropdownMenuCheckboxItem>
//                 <DropdownMenuCheckboxItem
//                   checked={filteredOrders.some((order) => order.status === "Pending")}
//                   onCheckedChange={() => handleFilter("Pending")}
//                 >
//                   Pending
//                 </DropdownMenuCheckboxItem>
//                 <DropdownMenuCheckboxItem
//                   checked={filteredOrders.some((order) => order.status === "Refunded")}
//                   onCheckedChange={() => handleFilter("Refunded")}
//                 >
//                   Refunded
//                 </DropdownMenuCheckboxItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//             <div className="flex items-center gap-2">
//               <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
//                 <DownloadIcon className="h-3.5 w-3.5" />
//                 <span>Export</span>
//               </Button>
//             </div>
//           </CardFooter>
//         </Card>
//       </div>
//       <div className="grid gap-4 md:gap-8">
//         <Card>
//           <CardHeader className="pb-3">
//             <CardTitle>Order Summary</CardTitle>
//             <CardDescription>Key metrics for your order history.</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid gap-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <div className="text-sm text-muted-foreground">Total Orders</div>
//                   <div className="text-2xl font-bold">{totalOrders}</div>
//                 </div>
//                 <ShoppingCartIcon className="w-8 h-8 text-muted-foreground" />
//               </div>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <div className="text-sm text-muted-foreground">Total Revenue</div>
//                   <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
//                 </div>
//                 <DollarSignIcon className="w-8 h-8 text-muted-foreground" />
//               </div>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <div className="text-sm text-muted-foreground">Average Order Value</div>
//                   <div className="text-2xl font-bold">${averageOrderValue.toFixed(2)}</div>
//                 </div>
//                 <GaugeIcon className="w-8 h-8 text-muted-foreground" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </main>
//   </div>
// )
// }
