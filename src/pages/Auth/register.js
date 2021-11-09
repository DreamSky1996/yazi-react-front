import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { update, generateData } from "../../components/Form/formActions";
import SelectFilterDropDown from "../../components/util/selectFilterDropDown";
import { register, clearErrors } from "../../actions/user_actions";
import { connect } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import {REGISTER_JSON} from "../../components/Jsons/register_forms";
import { useHistory } from "react-router-dom";

const formdata = REGISTER_JSON;

function Register(props) {
  const [formData, setFormData] = useState(formdata);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const validator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState();
  const closeMenu = () => {
    openMenu && setOpenMenu(false);
  };
  const history = useHistory();
  const updateForm = (element) => {
    const newFormdata = update(element, formData, "register");
    setFormData(newFormdata);
  };
  const accountType = [
    { title: "Buyer", value: "buyer" },
    { title: "Seller", value: "seller" },
  ];
  const submitForm = (event) => {
    event.preventDefault();
    if (validator.current.allValid()) {
      setLoading(true);
      let dataToSubmit = generateData(formData, "register");
      console.log(dataToSubmit);
      register(dataToSubmit)
        .then((res) => {
          setLoading(false);
          setError("");
          if (res.message === "User created!") {
            history.push("/login");
            props.clearErrors();
          }
        })
        .catch((err) => {
          setLoading(false);
          setError(err.message);
        });
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };
  useEffect(() => {
    if (props.userLoggedIn) {
      history.push("/");
    }
  }, []);

  return (
    <div className="page-wrapper login-wrapper" onClick={closeMenu}>
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-lg-11 clearfix">
            <div className="row justify-content-center">
              <div className="col-lg-7 contact-form align-self-center">
                <h4 className="text-left">
                  <strong>Lorem ipsum dolor sit amet.</strong>
                </h4>
                <p>
                  Already have Account? <Link to="/login">Login</Link>
                </p>
                <form>
                  <div className="row">
                    <div className="col-sm-12 mt-4">
                      <SelectFilterDropDown
                        openMenu={openMenu}
                        setOpenMenu={setOpenMenu}
                        options={accountType}
                        register={true}
                        title="Account Type"
                        width="160px"
                        onChange={(selectedValue) =>
                          updateForm({ selectedValue, id: "type" })
                        }
                        closeMenu={() => setOpenMenu(false)}
                      />
                      {validator.current.message(
                        "Account Type",
                        formData.type.value,
                        "required",
                        { className: "text-danger" }
                      )}
                    </div>
                    <div className="col-sm-12 mt-4">
                      <input
                        {...formData.name.config}
                        onChange={(event) => updateForm({ event, id: "name" })}
                        className="form-control"
                        value={formData.name.value}
                      />
                      {validator.current.message(
                        "name",
                        formData.name.value,
                        "required",
                        { className: "text-danger" }
                      )}
                    </div>
                    <div className="col-sm-12 mt-4">
                      <input
                        {...formData.email.config}
                        onChange={(event) => updateForm({ event, id: "email" })}
                        className="form-control"
                        value={formData.email.value}
                      />
                      {validator.current.message(
                        "email",
                        formData.email.value,
                        "required|email",
                        { className: "text-danger" }
                      )}
                    </div>
                    <div className="col-sm-12 mt-4">
                      <input
                        {...formData.password.config}
                        onChange={(event) =>
                          updateForm({ event, id: "password" })
                        }
                        className="form-control"
                        value={formData.password.value}
                      />
                      {validator.current.message(
                        "password",
                        formData.password.value,
                        "required|min:5",
                        { className: "text-danger" }
                      )}
                    </div>
                    <div className="col-sm-12 mt-4">
                      <input
                        {...formData.confirmPassword.config}
                        onChange={(event) =>
                          updateForm({ event, id: "confirmPassword" })
                        }
                        className="form-control"
                        value={formData.confirmPassword.value}
                      />
                      {validator.current.message(
                        "confirm_password",
                        formData.confirmPassword.value,
                        `required|in:${formData.password.value}`,
                        {
                          messages: { in: "Passwords need to match!" },
                          className: "text-danger",
                        }
                      )}
                    </div>
                    <div className="col-sm-12 mt-4">
                      <input
                        {...formData.address.config}
                        onChange={(event) =>
                          updateForm({ event, id: "address" })
                        }
                        className="form-control"
                        value={formData.address.value}
                      />
                      {validator.current.message(
                        "Address",
                        formData.address.value,
                        "required",
                        { className: "text-danger" }
                      )}
                    </div>

                    <div className="col-sm-12 mt-4">
                      <input
                        {...formData.contactNumber.config}
                        onChange={(event) =>
                          updateForm({ event, id: "contactNumber" })
                        }
                        className="form-control"
                        value={formData.contactNumber.value}
                      />
                      {validator.current.message(
                        "Contact Number",
                        formData.contactNumber.value,
                        "required",
                        { className: "text-danger" }
                      )}
                    </div>
                  </div>
                  <div className="mt-4 text-right">
                    <button className="btn btn-primary" onClick={submitForm}>
                      Register
                      <img
                        style={{ display: loading ? "inline" : "none" }}
                        className="loading"
                        src="./images/loading.gif"
                        alt=""
                      />
                    </button>
                    <div className="error">{error}</div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    error: state.errors.message,
    userLoggedIn: state.user.userLoggedIn,
  };
};

export default connect(mapStateToProps)(Register);
