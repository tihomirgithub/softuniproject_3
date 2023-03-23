import React from "react";
function Select()  {
  const [selectValue, setSelectValue] = React.useState("");
  const onChange = (event) => {
    const value = event.target.value;
    setSelectValue(value);
  };
  return (
    <div>
      <h2 className="mb-3">React Select onChange Example</h2>
      <select onChange={onChange} className="form-select">
        <option defaultValue disabled>
          Select Fruit
        </option>
        <option value="Apples">Apples</option>
        <option value="Grape">Grape</option>
        <option value="Bananas">Bananas</option>
        <option value="Blueberries">Blueberries</option>
        <option value="Melons">Melons</option>
      </select>
      {selectValue && <h2 className="mt-3">{selectValue}</h2>}
    </div>
  );
};
export default Select;