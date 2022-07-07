import React, { useState } from "react";
import "./App.css";
// import Select from "./components/Select";
import Dropdown from "./components/DropDown";

function App() {
  const options = [
    { name: "Zambia", code: "za" },
    { name: "Namibia", code: "nm" },
    { name: "Zimbabwe", code: "zw" },
  ];
  const [selectedItem, setSelectedItem] = useState<string | null>("");
  console.log(selectedItem);
  return (
    <div className="App">
      {/* <Select /> */}
      <br style={{ border: "1px solid grey" }} />
      <Dropdown
        name="countries"
        label="name"
        id="code"
        placeholder="-Select Category"
        options={options}
        onSelectChange={(selection) => setSelectedItem(selection)}
      />
    </div>
  );
}

export default App;
