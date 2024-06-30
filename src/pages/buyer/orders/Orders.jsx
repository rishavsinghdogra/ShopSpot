import { useState,  useContext, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {  FilterIcon, DownloadIcon, ShoppingCartIcon, DollarSignIcon, GaugeIcon } from "lucide-react";
import { fetchOrdersData } from "@/utils/Utils";
import { UserDataContext } from "@/contexts/UserDataContext";

const Orders = () => {
  const [ordersData, setOrdersData] = useState([]);
  const { accessKey } = useContext(UserDataContext);
  console.log(ordersData)

  useEffect(() => {
    const fetchStores = async () => {
      const result = await fetchOrdersData(accessKey);
      setOrdersData(result);
    };
    fetchStores();
  }, [accessKey]);



  const totalOrders = ordersData.length;
  const totalRevenue = ordersData.reduce((acc, order) => acc + parseFloat(order.productPrice), 0);
  const averageOrderValue = totalRevenue / totalOrders;

  return (
    <div className="flex flex-col  w-full sm:w-[70%] mx-auto bg-muted/40 p-4">
      <main className=" grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ">
        <div className=" gap-4 md:gap-8 lg:col-span-2">
          <Card className="grid  gap-4 md:gap-8">
            <CardHeader className="pb-3">
              <CardTitle>Your Orders</CardTitle>
              <CardDescription className="max-w-lg  leading-relaxed">
                Introducing Our Dynamic Orders Dashboard for Seamless Management and Insightful Analysis.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]  overflow-y-auto">
              <Table className=" overflow-x-auto overflow-y-auto">
                <TableHeader>
                  <TableRow>
                    <TableHead className="cursor-pointer" >
                      Product 
                    </TableHead>
                    <TableHead className="cursor-pointer" >
                      Price 
                    </TableHead>
                    <TableHead className="cursor-pointer" >
                      Buyer 
                    </TableHead>
                    <TableHead className="cursor-pointer" >
                      Buyer Email 
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ordersData.map((order) => (
                    <TableRow key={order?.accessKey}>
                      <TableCell>{order?.product}</TableCell>
                      <TableCell>${parseFloat(order?.productPrice).toFixed(2)}</TableCell>
                      <TableCell>{order?.buyerName}</TableCell>
                      <TableCell>{order?.buyerEmail}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                    <FilterIcon className="h-3.5 max-w-3.5" />
                    <span>Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    // checked={filteredOrders.length === ordersData.length}
                    // onCheckedChange={() => handleFilter("all")}
                  >
                    All
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    // checked={filteredOrders.some((order) => order.status === "Fulfilled")}
                    // onCheckedChange={() => handleFilter("Fulfilled")}
                  >
                    Fulfilled
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    // checked={filteredOrders.some((order) => order.status === "Pending")}
                    // onCheckedChange={() => handleFilter("Pending")}
                  >
                    Pending
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    // checked={filteredOrders.some((order) => order.status === "Refunded")}
                    // onCheckedChange={() => handleFilter("Refunded")}
                  >
                    Refunded
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                  <DownloadIcon className="h-3.5 max-w-3.5" />
                  <span>Export</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="grid  gap-4 md:gap-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Key metrics for your order history.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
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
  );
};

export default Orders;
