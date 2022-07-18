import { useState, useRef } from "react";
import { useClickAway } from "react-use";

import { Button, Container } from "./Select.style";
import SelectProvider from "../../context/select";
import type { Option } from "../../types/select";
import { SelectOption } from "./SelectOption";

interface Props {
  children?: React.ReactNode;
}

const Select: React.FC<Props> & {
  Option: typeof SelectOption;
} = ({ children }) => {
  const [selectedValue, setSelectedValue] = useState<Option>();
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef(null);
  useClickAway(ref, () => {
    setIsOpen(false);
  });

  const handleSelected = (selectedItem: Option) => {
    setSelectedValue(selectedItem);
    setIsOpen(false);
  };

  return (
    <Container ref={ref}>
      <Button onClick={() => setIsOpen(true)}>{selectedValue?.label}</Button>
      {isOpen && (
        <ul>
          <SelectProvider
            selectedValue={selectedValue}
            handleSelected={handleSelected}
          >
            {children}
          </SelectProvider>
        </ul>
      )}
    </Container>
  );
};

// Select.Option = [];
Select.Option = SelectOption;

export default Select;

const options: Option[] = [
  {
    label: "hello",
    value: "hello",
  },
  {
    label: "hi",
    value: "hi",
  },
  {
    label: "안뇽",
    value: "안뇽",
  },
];
