import { createContext, useContext, useMemo } from "react";
import { SetStateType } from "../../types/utils";
import type { Option } from "../../types/select";

interface ContextValue {
  selectedValue: Option | undefined;
  handleSelected: (option: Option) => void;
}

interface Props extends ContextValue {
  children: React.ReactNode;
}

const SelectContext: React.Context<ContextValue> = createContext({
  selectedValue: {},
  handleSelected: () => {},
  // setSelectedValue: () => {},
} as any);

const SelectProvider = ({ selectedValue, handleSelected, children }: Props) => {
  const value = useMemo(
    () => ({ selectedValue, handleSelected }),
    [selectedValue, handleSelected]
  );

  return (
    <SelectContext.Provider value={value}>{children}</SelectContext.Provider>
  );
};

export const useSelectContext = () => useContext(SelectContext);

export default SelectProvider;
