import { useState, useRef, useEffect } from "react";
import { useClickAway } from "react-use";

import { Button, Container } from "./Select.style";
import SelectProvider from "../../context/select";
import type { Option } from "../../types/select";
import { SelectOption } from "./SelectOption";
import { useControlled } from "../../hooks";

interface Props {
  onSelect: (selectedValue: Option | undefined) => void;
  value?: Option;
  defaultValue?: Option;
  children?: React.ReactNode;
}

const Select: React.FC<Props> & {
  Option: typeof SelectOption;
} = ({ value, defaultValue, onSelect, children }) => {
  const [selectedValue, setSelectedValue] = useControlled<Option | undefined>({
    controlled: value,
    default: defaultValue,
  });
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef(null);
  useClickAway(ref, () => {
    setIsOpen(false);
  });

  const handleSelected = (selectedOption: Option) => {
    setSelectedValue(selectedOption);
    setIsOpen(false);
  };

  useEffect(() => {
    onSelect?.(selectedValue);
  }, [selectedValue]);

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

Select.Option = SelectOption;

export default Select;
