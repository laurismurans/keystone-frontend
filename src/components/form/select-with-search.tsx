"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

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

interface SelectWithSearchProps {
  data: string[];
  onChange: (value: string) => void;
  itemName: string;
}

function SelectWithSearch(props: SelectWithSearchProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const itemNameLowercase = props.itemName.toLocaleLowerCase();

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[300px] justify-between"
          >
            {value
              ? props.data.find((selectItem) => selectItem === value)
              : `Please select a ${itemNameLowercase}`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder={`Search for a ${itemNameLowercase}`} />
            <CommandList>
              <CommandEmpty>{`${props.itemName} not found`}</CommandEmpty>
              <CommandGroup>
                {props.data.map((selectItem) => (
                  <CommandItem
                    key={selectItem}
                    value={selectItem}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                      props.onChange(
                        currentValue === value ? "" : currentValue,
                      );
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-0",
                        value === selectItem ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {selectItem}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default SelectWithSearch;
