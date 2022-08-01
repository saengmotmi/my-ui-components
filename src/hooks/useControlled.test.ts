import {
  render,
  fireEvent,
  screen,
  renderHook,
  act,
} from "@testing-library/react";
import useControlled from "./useControlled";
import { Option } from "../types/select";

describe("useControlled", () => {
  it("useControlled에 controlled props가 전달되면 배열의 첫 번째 값으로 같은 값을 리턴해야 한다", () => {
    const value = {
      label: "hi",
      value: "hello",
    };

    const { result } = renderHook(() =>
      useControlled<Option | undefined>({ controlled: value })
    );

    expect(result.current[0]).toMatchObject(value);

    act(() => result.current[1]({ label: "foo", value: "bar" }));

    expect(result.current[0]).toMatchObject(value);
  });

  it("useControlled에 controlled props가 전달되지 않으면 set 함수의 값을 따라간다", () => {
    const value = { label: "hi", value: "hello" };

    const { result } = renderHook(() =>
      useControlled<Option | undefined>({ controlled: undefined })
    );

    expect(result.current[0]).toBe(undefined);

    act(() => result.current[1](value));

    expect(result.current[0]).toMatchObject(value);
  });
});
