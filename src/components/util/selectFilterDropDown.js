import React, { useState } from "react";

const SelectFilterDropDown = (props) => {
  const { openMenu, setOpenMenu, options } = props;
  const [selectedValue, setSelectedValue] = useState(props.init);

  return (
    <div className="dropdown">
      {/* a here need to be edited to drop down list  */}

      <div
        className="btn btn-light dropdown-toggle"
        id="dropdownMenuLink"
        onClick={() => setOpenMenu(!openMenu)}
      >
        {props.register ? selectedValue || props.title : props.title}
      </div>
      <div
        style={{ display: openMenu ? "block" : "none", width: props.width }}
        className="dropdown-menu"
        aria-labelledby="dropdownMenuLink"
      >
        {options.map((option) => (
          <div
            key={option.title}
            className={`dropdown-item ${
              selectedValue === option.value ? "active" : ""
            }`}
            onClick={(event) => {
              setSelectedValue(option.value);
              props.onChange(option.value);
              props.closeMenu()
            }}
          >
            {option.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectFilterDropDown;
