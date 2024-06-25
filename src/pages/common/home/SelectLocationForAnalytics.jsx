"use client";
import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ProductList } from "@/utils/ProductsList";
import { allStoresData } from "@/utils/AllStoresData";

export function SelecLocationForAnalytics({
  setChartData,
  sector,
  storesData,
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);

  const AccessKey = storesData.map((store) => store?.accessKey);

  React.useEffect(() => {
    function getProductPriceData(selectedProduct) {
      let data;

      if (sector) {
        if (!selectedProduct) {
          let rishav = [];

          for (let i = 0; i < AccessKey.length; i++) {
            const rocks = allStoresData?.filter(
              (product) =>
                product["product"] === "Bread" &&
                product["accessKey"] === AccessKey[i]
            );

            rishav.push(
              isNaN(Number(rocks[0]?.productPrice))
                ? 0
                : Number(rocks[0]?.productPrice)
            );
          }
          data = [...rishav];
          return data;
        } else {
          let rishav = [];

          for (let i = 0; i < AccessKey.length; i++) {
            const rocks = allStoresData?.filter(
              (product) =>
                product["product"] === selectedProduct &&
                product["accessKey"] === AccessKey[i]
            );

            rishav.push(
              isNaN(Number(rocks[0]?.productPrice))
                ? 0
                : Number(rocks[0]?.productPrice)
            );
          }
          data = [...rishav];
          return data;
        }
      } else {
        if (!selectedProduct) {
          data = allStoresData?.filter(
            (product) => product["product"] === "Bread"
          );
        } else {
          data = allStoresData?.filter(
            (product) => product["product"] === selectedProduct
          );
        }
      }
      const productData = data?.map((product) => Number(product.productPrice));
      return productData;
    }
    const productPrice = getProductPriceData(value);
    console.log("productPrice", productPrice);
    setChartData([
      {
        name: "Product Prices",
        data: productPrice,
      },
    ]);
  }, [value, setChartData, sector, storesData]);

  return (
    <Popover open={open} onOpenChange={setOpen} className="rounded-md">
      <PopoverTrigger asChild>
        <Button
          variant="soft"
          className="w-[200px] justify-between bg-white text-black h-12 text-md"
        >
          {value ? value : "Select a product..."}
          <CaretSortIcon
            color="black"
            className="ml-2 h-4 w-4 shrink-0 opacity-50"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search product..." className="h-9" />
          <CommandList>
            <CommandEmpty>No product found.</CommandEmpty>
            <CommandGroup>
              {ProductList.map((product) => (
                <CommandItem
                  key={product}
                  value={product}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {product}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === product ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default SelecLocationForAnalytics;
