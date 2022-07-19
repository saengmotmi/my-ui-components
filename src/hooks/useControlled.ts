import { useCallback, useRef, useState } from "react";

interface Props<T> {
  controlled: T;
  default?: T;
}

const useControlled = <T>({ controlled, default: defaultProp }: Props<T>) => {
  // isControlled is ignored in the hook dependency lists as it should never change.
  const { current: isControlled } = useRef(controlled !== undefined);
  const [valueState, setValue] = useState(defaultProp);
  const value = isControlled ? controlled : valueState;

  const setValueIfUncontrolled = useCallback((newValue: T) => {
    if (!isControlled) {
      setValue(newValue);
    }
  }, []);

  return [value, setValueIfUncontrolled] as [
    typeof value,
    typeof setValueIfUncontrolled
  ];
};

export default useControlled;
