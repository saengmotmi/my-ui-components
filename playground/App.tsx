import { Select } from "../src/components/Select";

function App() {
  return (
    <div className="App">
      <Select>
        <Select.Option value="ho">ho</Select.Option>
        <Select.Option value="ya">ya</Select.Option>
        <Select.Option value="woo">woo</Select.Option>
      </Select>
    </div>
  );
}

export default App;
