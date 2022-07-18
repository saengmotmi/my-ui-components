import { useSelectContext } from "../../context/select";
import { SelectOptionContainer } from "./Select.style";

interface SelectOptionProps {
  value: string | number;
  children: string;
}

export const SelectOption = ({ value, children }: SelectOptionProps) => {
  const { selectedValue, handleSelected } = useSelectContext();

  const isSelected = selectedValue?.value === value;

  return (
    <SelectOptionContainer
      isSelected={isSelected}
      onClick={() => handleSelected({ value, label: children })}
    >
      {children}
    </SelectOptionContainer>
  );
};
