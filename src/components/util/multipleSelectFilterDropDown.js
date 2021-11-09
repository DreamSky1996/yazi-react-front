import React, { useState, useEffect } from "react";

const MultipleSelectFilterDropDown = (props) => {
  const { openMenu, setOpenMenu, options, closeMenu } = props;
  const [selectedValues, setSelectedValues] = useState([]);
  const [mount,setMount]=useState(false)

  const handleToggle = (e,value) => {

    const currentIndex = selectedValues.indexOf(value);
    const newChecked = [...selectedValues];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedValues(newChecked);
  };


  useEffect(() => {
    if(mount){
      props.onChange(selectedValues);
    }
    setMount(true)
  }, [selectedValues]);

  useEffect(()=>{
    if(props.clear === "clear")
    setSelectedValues([])
  },[props.clear])

  return (
    <div onClick={closeMenu} className="dropdown">
      {/* a here need to be edited to drop down list  */}

      <div
        className="btn btn-light dropdown-toggle"
        id="dropdownMenuLink"
        onClick={() => setOpenMenu(!openMenu)}
      >
        {props.title}
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
              selectedValues.includes(option.value) ? "active" : ""
            }`}
            onClick={(event) => {
              handleToggle(event,option.value);
            }}
          >
            {option.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleSelectFilterDropDown;
