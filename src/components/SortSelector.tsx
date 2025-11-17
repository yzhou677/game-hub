import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { sortOrders } from "../constants/sortOrders";

interface SortSelectorProps {
  value?: string;
  onChange: (value: string) => void;
}

const SortSelector = ({ value, onChange }: SortSelectorProps) => {
  const currentSortOrder = sortOrders.find((order) => order.value === value);

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Order by: {currentSortOrder?.label || "Relevance"}
      </MenuButton>
      <MenuList>
        {sortOrders.map((order) => (
          <MenuItem key={order.value} onClick={() => onChange(order.value)}>
            {order.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SortSelector;
