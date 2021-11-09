import React, { useState, useEffect, useRef } from "react";
import "./addProduct.css";
import {
  update,
  generateData,
  resetFields,
} from "../../../components/Form/formActions";
import { connect } from "react-redux";
import MultipleSelectFilterDropDown from "../../../components/util/multipleSelectFilterDropDown";
import Dropzone from "react-dropzone";
import { addProduct } from "../../../actions/products_actions";
import SimpleReactValidator from "simple-react-validator";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import next from "../../../util/images/next.png";
import back from "../../../util/images/prev.png";
import SelectFilterDropDown from "../../../components/util/selectFilterDropDown";

const formdata = {
  name: {
    element: "input",
    value: "",
    config: {
      name: "email_input",
      type: "email",
      placeholder: "Email",
    },
  },
  price: {
    element: "input",
    value: "",
    config: {
      name: "accountType_input",
      type: "text",
    },
  },
  description: {
    element: "textarea",
    value: "",
    config: {
      name: "description_input",
      type: "text",
    },
  },
  size: {
    element: "select",
    value: [],
  },
  paymentMethod: {
    element: "select",
    value: [],
  },
  purchaseMethod: {
    element: "select",
    value: [],
  },
  shippingMethod: {
    element: "select",
    value: [],
  },
  clothType: {
    element: "select",
    value: "",
  },
  images: {
    element: "images",
    value: [],
  },
};

function AddProduct(props) {
  const validator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState();

  const [clearMenu, setClearMenu] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const [formData, setFormData] = useState(formdata);
  const [loading, setLoading] = useState(false);
  const [openSizeMenu, setSizeOpenMenu] = useState(false);

  const [openPurchaseMenu, setOpenPurchaseMenu] = useState(false);

  const [openPaymentMenu, setOpenPaymentMenu] = useState(false);

  const [openShippingMethodMenu, setOpenShippingMethodMenu] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState([
    { preview: "images/product.jpg", name: "img" },
  ]);
  const [openTypeMenu, setOpenTypeMenu] = useState(false);

  const typeFilters = [
    { title: "Women", value: "women" },
    { title: "Men", value: "men" },
    { title: "Kids", value: "kids" },
  ];

  const SizeFilters = [
    { title: "M", value: "M" },
    { title: "S", value: "S" },
    { title: "L", value: "L" },
  ];
  const purchaseMethodFilters = [
    { title: "METHOD ONE", value: "one" },
    { title: "METHOD TWO", value: "two" },
    { title: "METHOD THREE", value: "three" },
  ];
  const paymentMethodFilters = [
    { title: "Paypal", value: "paypal" },
    { title: "Payoneer", value: "payoneer" },
  ];
  const shippingMethodFilters = [
    { title: "DHL", value: "dhl" },
    { title: "FedEx", value: "fedex" },
  ];

  const close = {
    sizeMenu: () => setSizeOpenMenu(false),
    purchaseMenu: () => setOpenPurchaseMenu(false),
    paymentMenu: () => setOpenPaymentMenu(false),
    shippingMenu: () => setOpenShippingMethodMenu(false),
    typeMenu: () => setOpenTypeMenu(false),
  };

  const ArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <img
      {...props}
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
      className={
        "slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
      }
      alt=""
      src={back}
    />
  );
  const ArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <img
      size="30px"
      {...props}
      className={
        "slick-next slick-arrow" +
        (currentSlide === slideCount - 1 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
      color="black"
      alt=""
      src={next}
    />
  );
  const [config, setConfig] = useState({
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <ArrowLeft />,
    nextArrow: <ArrowRight />,
    rows: 1,
    autoplay: false,
  });

  const closeMenu = (key = "") => {
    for (let menu in close) {
      if (menu !== key) {
        close[menu]();
      }
    }
  };

  const updateForm = (element) => {
    const newFormdata = update(element, formData, "addProduct");
    setFormData(newFormdata);
    
  };

  const submitData = (event) => {
    event.preventDefault();

    if (validator.current.allValid()) {
      setLoading(true);
      validator.current.hideMessages();

      let dataToSubmit = generateData(formData, "addProduct");

      addProduct(dataToSubmit)
        .then((resMessage) => {
          if (resMessage === "Product created") {
            setMsg("added successfully");
            setErr("");
            setTimeout(() => {
              setMsg("");
            }, 1000);
            setUploadedPhotos([{ preview: "images/product.jpg", name: "img" }]);
            setLoading(false);
            clearFields();
          }
        })
        .catch((err) => {
          setErr(err.message);
          setLoading(false);
        });
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  const clearFields = () => {
    const newFormData = resetFields(formData, "product");
    setFormData(newFormData);
    setClearMenu("clear");
    setClearMenu("");
  };

  const onDrop = (files) => {
    let alreadyExist = false;
    uploadedPhotos.forEach((image) => {
      if (image.name.toLowerCase() === files[0].name.toLowerCase()) {
        alreadyExist = true;
      }
    });

    if (!alreadyExist) {
      if (uploadedPhotos[0].preview === "images/product.jpg")
        setUploadedPhotos([{ preview: files[0].preview, name: files[0].name }]);
      else
        setUploadedPhotos([
          { preview: files[0].preview, name: files[0].name },
          ...uploadedPhotos,
        ]);

      const newFormdata = update(
        { id: "images", image: files[0] },
        formData,
        "addProduct"
      );
      setFormData(newFormdata);
    }
  };

  return (
    <div onClick={closeMenu} className="add-product page-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="trending product-list">
              <div className="content">
                <div className="inner-content coleql_height">
                  <small className="d-block mb-2">By {props.user.name}</small>
                  <div className="embed-responsive embed-responsive-1by1">
                    <Slider {...config}>
                      {uploadedPhotos.map((image) => {
                        return (
                          <div key={image} className="full-img">
                            <img src={image.preview} alt="" />
                          </div>
                        );
                      })}
                    </Slider>
                    {/* <div className="full-img">
                      <img src={uploadedPhoto} alt="" />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8 ml-auto">
            <div className="upload-form">
              <form>
                <div className="row">
                  <div className="mb-4 col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Product name"
                      value={formData.name.value}
                      onChange={(event) => updateForm({ event, id: "name" })}
                      onClick={closeMenu}
                    />
                    {validator.current.message(
                      "Product Name",
                      formData.name.value,
                      "required",
                      { className: "text-danger" }
                    )}
                  </div>
                  <div className="filter-header mb-4 col-md-12">
                    <ul>
                      <li onClick={(e) => e.stopPropagation()}>
                        <MultipleSelectFilterDropDown
                          openMenu={openSizeMenu}
                          setOpenMenu={setSizeOpenMenu}
                          options={SizeFilters}
                          title="Size"
                          width="100px"
                          init="all"
                          onChange={(selectedValue) =>
                            updateForm({ selectedValue, id: "size" })
                          }
                          closeMenu={() => closeMenu("sizeMenu")}
                          clear={clearMenu}
                        />
                      </li>
                      <li onClick={(e) => e.stopPropagation()}>
                        <MultipleSelectFilterDropDown
                          openMenu={openPurchaseMenu}
                          setOpenMenu={setOpenPurchaseMenu}
                          options={purchaseMethodFilters}
                          title="Purchase Method"
                          width="160px"
                          init="all"
                          onChange={(selectedValue) =>
                            updateForm({ selectedValue, id: "purchaseMethod" })
                          }
                          closeMenu={() => closeMenu("purchaseMenu")}
                          clear={clearMenu}
                        />
                      </li>
                      <li onClick={(e) => e.stopPropagation()}>
                        <MultipleSelectFilterDropDown
                          openMenu={openPaymentMenu}
                          setOpenMenu={setOpenPaymentMenu}
                          options={paymentMethodFilters}
                          title="Payment Method"
                          width="160px"
                          init="all"
                          onChange={(selectedValue) =>
                            updateForm({ selectedValue, id: "paymentMethod" })
                          }
                          closeMenu={() => closeMenu("paymentMenu")}
                          clear={clearMenu}
                        />
                      </li>
                      <li onClick={(e) => e.stopPropagation()}>
                        <MultipleSelectFilterDropDown
                          openMenu={openShippingMethodMenu}
                          setOpenMenu={setOpenShippingMethodMenu}
                          options={shippingMethodFilters}
                          title="Shipping Method"
                          width="160px"
                          init="all"
                          onChange={(selectedValue) =>
                            updateForm({ selectedValue, id: "shippingMethod" })
                          }
                          closeMenu={() => closeMenu("shippingMenu")}
                          clear={clearMenu}
                        />
                      </li>
                      <li
                        onClick={(e) => {
                          e.stopPropagation();
                          closeMenu("typeMenu");
                        }}
                      >
                        <SelectFilterDropDown
                          openMenu={openTypeMenu}
                          setOpenMenu={setOpenTypeMenu}
                          options={typeFilters}
                          title="Cloths Type"
                          width="160px"
                          init="all"
                          onChange={(selectedValue) =>
                            updateForm({ selectedValue, id: "clothType" })
                          }
                          closeMenu={() => setOpenTypeMenu(false)}
                          clear={clearMenu}
                        />
                      </li>
                    </ul>
                  </div>
                  <div className="mb-4 col-md-12">
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Description"
                      onChange={(event) => updateForm({ event, id: "description" })}
                      value={formData.description.value}
                      onClick={closeMenu}
                    ></textarea>
                  </div>
                  <div className="mb-4 col-md-4">
                    <Dropzone
                      onDrop={(e) => onDrop(e)}
                      multiple={false}
                      className="dropzone_box"
                      onClick={closeMenu}
                    >
                      <div className="capture_fld"></div>
                    </Dropzone>
                    {/* <div style={{ marginTop: "10px" }}>
                      {formData.images.value.map((file, i) => {
                        return <div key={i}>{file.name}</div>;
                      })}
                    </div> */}
                  </div>
                  <div className="mb-4 col-md-4">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Price"
                      value={formData.price.value}
                      onChange={(event) => updateForm({ event, id: "price" })}
                      onClick={closeMenu}
                    />
                    {validator.current.message(
                      "Product price",
                      formData.price.value,
                      "required",
                      { className: "text-danger" }
                    )}
                  </div>
                  <div className="mb-4 col-md-4">
                    <button
                      style={{ height: "50px" }}
                      className="btn btn-primary btn-block"
                      onClick={(e) => {
                        submitData(e);
                        closeMenu();
                      }}
                    >
                      Upload
                      <img
                        style={{ display: loading ? "inline" : "none" }}
                        className="loading"
                        src="./images/loading.gif"
                        alt=""
                      />
                    </button>
                    <div className="confirm-msg">{msg}</div>
                    <div className="error">{err}</div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapState)(AddProduct);
