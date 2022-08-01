import { useState, useRef, useEffect } from "react";
import { useClickAway } from "react-use";
import { v4 as uuid } from "uuid";

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

const Select: React.FC<Props> & { Option: typeof SelectOption } = ({
  value,
  defaultValue,
  onSelect,
  children,
}) => {
  const [id] = useState(() => uuid());
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
    onSelect?.(selectedOption);
    setIsOpen(false);
  };

  return (
    <Container ref={ref}>
      <Button
        id={`select-box-${id}`}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        aria-controls={`select-list-${id}`}
        onClick={() => setIsOpen(true)}
      >
        {selectedValue?.label}
      </Button>
      {/* visibility: hidden; <- 스크롤 등 상태를 유지해야 한다면 */}
      {isOpen && (
        <ul
          aria-labelledby={`select-box-${id}`}
          id={`select-list-${id}`}
          role="listbox"
        >
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
