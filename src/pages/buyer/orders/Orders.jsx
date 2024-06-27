import { useState, useMemo } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronsUpDownIcon, FilterIcon, DownloadIcon, ShoppingCartIcon, DollarSignIcon, GaugeIcon } from "lucide-react"


const Orders = () => {
    const orders = [
  {
    id: "INV001",
    date: "2023-06-01",
    items: 2,
    total: 150.99,
    status: "Fulfilled",
  },
  {
    id: "INV002",
    date: "2023-05-15",
    items: 1,
    total: 49.99,
    status: "Pending",
  },
  {
    id: "INV003",
    date: "2023-04-20",
    items: 3,
    total: 299.99,
    status: "Fulfilled",
  },
  {
    id: "INV004",
    date: "2023-03-10",
    items: 1,
    total: 79.99,
    status: "Refunded",
  },
  {
    id: "INV005",
    date: "2023-02-28",
    items: 4,
    total: 399.99,
    status: "Fulfilled",
  },
  {
    id: "INV006",
    date: "2023-01-15",
    items: 2,
    total: 150.99,
    status: "Fulfilled",
  },
  {
    id: "INV007",
    date: "2022-12-01",
    items: 1,
    total: 49.99,
    status: "Pending",
  },
  {
    id: "INV008",
    date: "2022-11-20",
    items: 3,
    total: 299.99,
    status: "Fulfilled",
  },
  {
    id: "INV009",
    date: "2022-10-10",
    items: 1,
    total: 79.99,
    status: "Refunded",
  },
  {
    id: "INV010",
    date: "2022-09-28",
    items: 4,
    total: 399.99,
    status: "Fulfilled",
  },
]
const [sortColumn, setSortColumn] = useState("date")
const [sortDirection, setSortDirection] = useState("desc")
const [filteredOrders, setFilteredOrders] = useState(orders)
const handleSort = (column) => {
  if (sortColumn === column) {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
  } else {
    setSortColumn(column)
    setSortDirection("asc")
  }
}
const handleFilter = (status) => {
  if (status === "all") {
    setFilteredOrders(orders)
  } else {
    setFilteredOrders(orders.filter((order) => order.status === status))
  }
}
const sortedOrders = useMemo(() => {
  return filteredOrders.sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
    return 0
  })
}, [filteredOrders, sortColumn, sortDirection])
const totalOrders = orders.length
const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0)
const averageOrderValue = totalRevenue / totalOrders
return (
  <div className="flex  flex-col   bg-muted/40">
    <main className="flex-1  grid gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid max-h-40 auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <Card className = "relative left-16 top-10" >
          <CardHeader className="pb-3">
            <CardTitle>Your Orders</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Introducing Our Dynamic Orders Dashboard for Seamless Management and Insightful Analysis.
            </CardDescription>
          </CardHeader>
          <CardContent className ="h-[400px] overflow-y-auto">
            <Table className ="">
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("id")}>
                    Order #{sortColumn === "id" && <ChevronsUpDownIcon className="ml-2 w-4 h-4" />}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
                    Date
                    {sortColumn === "date" && <ChevronsUpDownIcon className="ml-2 w-4 h-4" />}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("items")}>
                    Items
                    {sortColumn === "items" && <ChevronsUpDownIcon className="ml-2 w-4 h-4" />}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("total")}>
                    Total
                    {sortColumn === "total" && <ChevronsUpDownIcon className="ml-2 w-4 h-4" />}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                    Status
                    {sortColumn === "status" && <ChevronsUpDownIcon className="ml-2 w-4 h-4" />}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        className="text-xs"
                        variant={
                          order.status === "Fulfilled"
                            ? "secondary"
                            : order.status === "Pending"
                            ? "outline"
                            : "danger"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                  <FilterIcon className="h-3.5 w-3.5" />
                  <span>Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={filteredOrders.length === orders.length}
                  onCheckedChange={() => handleFilter("all")}
                >
                  All
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filteredOrders.some((order) => order.status === "Fulfilled")}
                  onCheckedChange={() => handleFilter("Fulfilled")}
                >
                  Fulfilled
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filteredOrders.some((order) => order.status === "Pending")}
                  onCheckedChange={() => handleFilter("Pending")}
                >
                  Pending
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filteredOrders.some((order) => order.status === "Refunded")}
                  onCheckedChange={() => handleFilter("Refunded")}
                >
                  Refunded
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                <DownloadIcon className="h-3.5 w-3.5" />
                <span>Export</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="grid max-w-72 relative left-12 mt-10  gap-4 md:gap-8">
        <Card>
          <CardHeader className="pb-3 ">
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Key metrics for your order history.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid  gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Total Orders</div>
                  <div className="text-2xl font-bold">{totalOrders}</div>
                </div>
                <ShoppingCartIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Total Revenue</div>
                  <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                </div>
                <DollarSignIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Average Order Value</div>
                  <div className="text-2xl font-bold">${averageOrderValue.toFixed(2)}</div>
                </div>
                <GaugeIcon className="w-8 h-8 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  </div>
)
}

 
export default Orders;

// // hero section

// return (
//     <div className="min-h-screen bg-gradient-to-b from-primary to-primary-foreground">
//       <header className="flex items-center justify-between p-4 border-b bg-white">
//         <div className="flex items-center space-x-4">
//           <StoreIcon className="w-8 h-8" />
//           <span className="text-2xl font-bold">ShopSpot</span>
//         </div>
//         <nav className="flex items-center space-x-4">
//           <Link href="#" className="text-lg" prefetch={false}>
//             Remove Background
//           </Link>
//           <Link href="#" className="text-lg" prefetch={false}>
//             How to use
//           </Link>
//           <Link href="#" className="text-lg" prefetch={false}>
//             Tools & API
//           </Link>
//           <Link href="#" className="text-lg" prefetch={false}>
//             Pricing
//           </Link>
//           <Link href="#" className="text-lg" prefetch={false}>
//             Log in
//           </Link>
//           <Button variant="outline">Sign up</Button>
//         </nav>
//       </header>
//       <main className="flex flex-col items-center justify-center p-8 space-y-8">
//         <div className="flex items-center space-x-8">
//           <div className="flex flex-col items-start space-y-4">
//             <h1 className="text-4xl font-bold">Remove Image Background</h1>
//             <p className="text-lg">
//               100% Automatically and <span className="font-bold text-yellow-500">Free</span>
//             </p>
//             <div className="flex flex-col md:flex-row gap-4">
//               <Button className="w-full md:w-auto">Try it now</Button>
//               <Button variant="outline" className="w-full md:w-auto">
//                 Learn more
//               </Button>
//             </div>
//           </div>
//           <img src="/placeholder.svg" alt="Person with flowers" className="w-64 h-64 rounded-full" />
//         </div>
//         <section className="w-full max-w-4xl">
//           <h2 className="text-3xl font-bold mb-4">How it works</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-white rounded-lg shadow-md p-6 text-center">
//               <UploadIcon className="w-12 h-12 mx-auto mb-4 text-primary" />
//               <h3 className="text-xl font-bold mb-2">Upload Image</h3>
//               <p className="text-gray-500">Simply upload your image and let our AI do the rest.</p>
//             </div>
//             <div className="bg-white rounded-lg shadow-md p-6 text-center">
//               <WandIcon className="w-12 h-12 mx-auto mb-4 text-primary" />
//               <h3 className="text-xl font-bold mb-2">Remove Background</h3>
//               <p className="text-gray-500">Our advanced AI will automatically remove the background.</p>
//             </div>
//             <div className="bg-white rounded-lg shadow-md p-6 text-center">
//               <DownloadIcon className="w-12 h-12 mx-auto mb-4 text-primary" />
//               <h3 className="text-xl font-bold mb-2">Download Image</h3>
//               <p className="text-gray-500">Download your image with a transparent background.</p>
//             </div>
//           </div>
//         </section>
//         <section className="w-full max-w-4xl">
//           <h2 className="text-3xl font-bold mb-4">Why Choose ShopSpot?</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <FastForwardIcon className="w-12 h-12 mb-4 text-primary" />
//               <h3 className="text-xl font-bold mb-2">Fast and Efficient</h3>
//               <p className="text-gray-500">
//                 Our AI-powered background removal is lightning fast, so you can get your images ready in no time.
//               </p>
//             </div>
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <QrCodeIcon className="w-12 h-12 mb-4 text-primary" />
//               <h3 className="text-xl font-bold mb-2">High-Quality Results</h3>
//               <p className="text-gray-500">
//                 Our advanced algorithms ensure that your images are processed with the utmost precision, leaving you
//                 with a flawless result.
//               </p>
//             </div>
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <FlagIcon className="w-12 h-12 mb-4 text-primary" />
//               <h3 className="text-xl font-bold mb-2">100% Free</h3>
//               <p className="text-gray-500">
//                 We believe in making powerful tools accessible to everyone, so our background removal service is
//                 completely free to use.
//               </p>
//             </div>
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <AccessibilityIcon className="w-12 h-12 mb-4 text-primary" />
//               <h3 className="text-xl font-bold mb-2">Easy to Use</h3>
//               <p className="text-gray-500">
//                 Our intuitive interface makes it a breeze to upload, process, and download your images with a
//                 transparent background.
//               </p>
//             </div>
//           </div>
//         </section>
//         <section className="w-full max-w-4xl mt-16">
//           <h2 className="text-3xl font-bold mb-4">Testimonials</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex items-center mb-4">
//                 <img src="/placeholder.svg" alt="User Avatar" className="w-10 h-10 rounded-full mr-4" />
//                 <div>
//                   <h4 className="text-lg font-bold">John Doe</h4>
//                   <p className="text-gray-500">CEO, Acme Inc.</p>
//                 </div>
//               </div>
//               <p className="text-gray-500">
//                 "ShopSpot has been a game-changer for our e-commerce business. The background removal tool is incredibly
//                 accurate and easy to use."
//               </p>
//             </div>
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex items-center mb-4">
//                 <img src="/placeholder.svg" alt="User Avatar" className="w-10 h-10 rounded-full mr-4" />
//                 <div>
//                   <h4 className="text-lg font-bold">Jane Smith</h4>
//                   <p className="text-gray-500">Graphic Designer</p>
//                 </div>
//               </div>
//               <p className="text-gray-500">
//                 "I love how fast and efficient ShopSpot's background removal is. It's saved me so much time in my design
//                 workflow."
//               </p>
//             </div>
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex items-center mb-4">
//                 <img src="/placeholder.svg" alt="User Avatar" className="w-10 h-10 rounded-full mr-4" />
//                 <div>
//                   <h4 className="text-lg font-bold">Michael Johnson</h4>
//                   <p className="text-gray-500">Ecommerce Manager</p>
//                 </div>
//               </div>
//               <p className="text-gray-500">
//                 "ShopSpot's background removal tool is a must-have for any online business. The quality is unbeatable,
//                 and it's completely free!"
//               </p>
//             </div>
//           </div>
//         </section>
//         <section className="w-full max-w-4xl mt-16">
//           <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h3 className="text-xl font-bold mb-2">How accurate is the background removal?</h3>
//               <p className="text-gray-500">
//                 Our advanced AI algorithms are highly accurate, ensuring that your images are processed with precision.
//                 We're confident you'll be satisfied with the results.
//               </p>
//             </div>
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h3 className="text-xl font-bold mb-2">Is there a limit to the number of images I can process?</h3>
//               <p className="text-gray-500">
//                 No, there is no limit to the number of images you can process with ShopSpot. Our service is completely
//                 free and available to everyone.
//               </p>
//             </div>
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h3 className="text-xl font-bold mb-2">How long does the background removal take?</h3>
//               <p className="text-gray-500">
//                 Our AI-powered background removal is lightning fast, typically taking just a few seconds to process your
//                 image. You'll have your transparent image ready in no time.
//               </p>
//             </div>
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h3 className="text-xl font-bold mb-2">Can I use the processed images commercially?</h3>
//               <p className="text-gray-500">
//                 Absolutely! The images you process with ShopSpot are yours to use however you'd like, including for
//                 commercial purposes. We don't place any restrictions on how you use the images.
//               </p>
//             </div>
//           </div>
//         </section>
//         <section className="w-full max-w-4xl mt-16">
//           <h2 className="text-3xl font-bold mb-4">Start Using ShopSpot Today</h2>
//           <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center justify-between">
//             <div className="flex flex-col items-start space-y-4 mb-4 md:mb-0">
//               <h3 className="text-2xl font-bold">Ready to get started?</h3>
//               <p className="text-gray-500">
//                 Try our background removal tool for free and see how it can transform your images.
//               </p>
//             </div>
//             <div className="flex flex-col md:flex-row gap-4">
//               <Button className="w-full md:w-auto">Try it now</Button>
//               <Button variant="outline" className="w-full md:w-auto">
//                 Learn more
//               </Button>
//             </div>
//           </div>
//         </section>
//         <section className="w-full max-w-4xl mt-16">
//           <h2 className="text-3xl font-bold mb-4">About ShopSpot</h2>
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <p className="text-gray-500 mb-4">
//               ShopSpot is a revolutionary image background removal tool that uses advanced AI technology to
//               automatically remove backgrounds from your images. Our mission is to empower businesses and individuals
//               with a fast, accurate, and completely free solution for enhancing their visual content.
//             </p>
//             <p className="text-gray-500 mb-4">
//               Founded in 2020, ShopSpot has quickly become the go-to tool for e-commerce businesses, designers, and
//               content creators who need to create high-quality product images and visuals. Our commitment to innovation
//               and user-friendly experience has made us a trusted partner for thousands of customers around the world.
//             </p>
//             <p className="text-gray-500 mb-4">
//               At ShopSpot, we believe that powerful tools should be accessible to everyone. That's why we've made our
//               background removal service completely free to use, with no limits on the number of images you can process.
//               We're dedicated to empowering our users to create stunning visuals that captivate their audience and drive
//               business growth.
//             </p>
//           </div>
//         </section>
//         <section className="w-full max-w-4xl mt-16">
//           <h2 className="text-3xl font-bold mb-4">Our Team</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex items-center mb-4">
//                 <img src="/placeholder.svg" alt="Team Member" className="w-16 h-16 rounded-full mr-4" />
//                 <div>
//                   <h4 className="text-lg font-bold">John Doe</h4>
//                   <p className="text-gray-500">Co-founder & CEO</p>
//                 </div>
//               </div>
//               <p className="text-gray-500">
//                 John is a seasoned entrepreneur with a passion for building innovative technology solutions. He leads
//                 the ShopSpot team with a focus on delivering exceptional customer experiences.
//               </p>
//             </div>
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex items-center mb-4">
//                 <img src="/placeholder.svg" alt="Team Member" className="w-16 h-16 rounded-full mr-4" />
//                 <div>
//                   <h4 className="text-lg font-bold">Jane Smith</h4>
//                   <p className="text-gray-500">Co-founder & CTO</p>
//                 </div>
//               </div>
//               <p className="text-gray-500">
//                 Jane is a brilliant computer scientist and AI expert. She leads the technical development of ShopSpot,
//                 ensuring our background removal algorithms are cutting-edge and reliable.
//               </p>
//             </div>
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex items-center mb-4">
//                 <img src="/placeholder.svg" alt="Team Member" className="w-16 h-16 rounded-full mr-4" />
//                 <div>
//                   <h4 className="text-lg font-bold">Michael Johnson</h4>
//                   <p className="text-gray-500">Head of Product</p>
//                 </div>
//               </div>
//               <p className="text-gray-500">
//                 Michael is a product visionary who is passionate about creating user-friendly and intuitive tools. He
//                 leads the product development team to ensure ShopSpot delivers an exceptional experience for our users.
//               </p>
//             </div>
//           </div>
//         </section>
//         <footer className="w-full max-w-4xl mt-16 bg-white rounded-lg shadow-md p-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
//             <div className="space-y-2">
//               <h4 className="text-lg font-bold">Company</h4>
//               <ul className="space-y-1">
//                 <li>
//                   <Link href="#" prefetch={false}>
//                     About
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" prefetch={false}>
//                     Careers
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" prefetch={false}>
//                     Blog
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" prefetch={false}>
//                     Contact
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div className="space-y-2">
//               <h4 className="text-lg font-bold">Products</h4>
//               <ul />
//             </div>
//           </div>
//         </footer>
//       </main>
//     </div>
//   )