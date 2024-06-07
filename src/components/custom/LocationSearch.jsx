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
import chandigarhSectors from "@/configs/ChandigarhSectors";
import { fetchStoresData } from "@/utils/Utils";
import { useEffect } from "react";

export function LocationSearch({setStoresData, setLoading, value , setValue}) {
  const [open, setOpen] = React.useState(false);
  

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      const result = await fetchStoresData(value);
      setStoresData(result);
      setLoading(false); // Data has been loaded
    };
    fetchStores();
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen} className="rounded-md">
      <PopoverTrigger asChild>
        <Button
          variant="soft"
          className="w-[200px] justify-between bg-white text-black h-12 text-md"
        >
          {value ? value : "Select a sector..."}
          <CaretSortIcon
            color="black"
            className="ml-2 h-4 w-4 shrink-0 opacity-50"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search sector..." className="h-9" />
          <CommandList>
            <CommandEmpty>No sector found.</CommandEmpty>
            <CommandGroup>
              {chandigarhSectors.map((sector) => (
                <CommandItem
                  key={sector}
                  value={sector}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {sector}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === sector ? "opacity-100" : "opacity-0"
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

export default LocationSearch;
