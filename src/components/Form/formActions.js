export const update = (element, formdata, formName) => {
  const newFormdata = {
    ...formdata,
  };
  const newElement = {
    ...newFormdata[element.id],
  };

  if (newElement.element === "select") newElement.value = element.selectedValue;
  else if (newElement.element === "images") {
    console.log(element);
    newElement.value = [...newElement.value, element.image];
  } else newElement.value = element.event.target.value;

  newFormdata[element.id] = newElement;

  return newFormdata;
};

export const generateData = (formdata, formName) => {
  let dataToSubmit = {};

  for (let key in formdata) {
    dataToSubmit[key] = formdata[key].value;
  }

  return dataToSubmit;
};

export const resetFields = (formdata, formName) => {
  const newFormdata = { ...formdata };

  for (let key in newFormdata) {
    console.log(key , key === "images")
    if (key === "images" || key === "select" ) newFormdata[key].value = [];

   else  newFormdata[key].value = "";
  }

  return newFormdata;
};
