import { useState } from "react";
import { Select } from "../src/components/Select";
import type { Option } from "../src/types/select";

function App() {
  const [state, setState] = useState<Option | undefined>({
    label: "label",
    value: "value",
  });

  return (
    <div className="App">
      <Select
        value={state}
        defaultValue={state}
        onSelect={(value) => {
          setState(value);
        }}
      >
        <Select.Option value="종택 ㅋㅋ">종택</Select.Option>
        <Select.Option value="ho">ho</Select.Option>
        <Select.Option value="ya">ya</Select.Option>
        <Select.Option value="woo">woo</Select.Option>
      </Select>
    </div>
  );
}

export default App;
