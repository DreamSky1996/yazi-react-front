import React, {useState, useRef, useEffect} from "react";
import {Link} from "react-router-dom";
import "./login.css"
import {update, generateData} from "../../components/Form/formActions";
import {LOGIN_JSON} from "../../components/Jsons/login_forms";
import SelectFilterDropDown from "../../components/util/selectFilterDropDown";
import {loginUser, clearErrors} from "../../actions/user_actions";
import {connect} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import {useHistory} from "react-router-dom";

function Login(props) {
    const formdata = LOGIN_JSON;
    const validator = useRef(new SimpleReactValidator());
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(formdata);
    const [openMenu, setOpenMenu] = useState(false);
    const [, forceUpdate] = useState();
    const closeMenu = () => {
        openMenu && setOpenMenu(false);
    };
    const history = useHistory();
    const updateForm = (element) => {
        const newFormdata = update(element, formData, "login");
        setFormData(newFormdata);
    };
    const accountType = [
        {title: "Buyer", value: "buyer"},
        {title: "Seller", value: "seller"},
    ];
    const submitForm = (event) => {
        event.preventDefault();

        if (validator.current.allValid()) {
            setLoading(true)
            let dataToSubmit = generateData(formData, "login");

            props.loginUser(dataToSubmit).then((res) => {
                setLoading(false)
                if (res.payload.userLoggedIn) {
                    console.log(res);
                    history.push("/");
                    props.clearErrors();
                }
            }).catch(err => {
                setLoading(false)
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
                                <h4 className="text-left"><strong>Please login your account.</strong></h4>
                                <p>
                                    NOT A MEMBER YET?
                                    <Link to="/register"><strong>JOIN NOW</strong></Link>
                                </p>
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
                                                updateForm({selectedValue, id: "type"})
                                            }
                                            closeMenu={() => setOpenMenu(false)}
                                        />
                                        {validator.current.message(
                                            "Account Type",
                                            formData.type.value,
                                            "required",
                                            {className: "text-danger"}
                                        )}
                                    </div>
                                    <div className="col-sm-12 mt-4">
                                        <input
                                            {...formData.email.config}
                                            onChange={(event) => updateForm({event, id: "email"})}
                                            className="form-control"
                                            value={formData.email.value}
                                        />
                                        {validator.current.message(
                                            "email",
                                            formData.email.value,
                                            "required|email",
                                            {className: "text-danger"}
                                        )}
                                    </div>
                                    <div className="col-sm-12 mt-4">
                                        <input
                                            {...formData.password.config}
                                            onChange={(event) =>
                                                updateForm({event, id: "password"})
                                            }
                                            className="form-control"
                                            value={formData.password.value}
                                        />
                                        {validator.current.message(
                                            "password",
                                            formData.password.value,
                                            "required|min:5",
                                            {className: "text-danger"}
                                        )}
                                    </div>
                                </div>
                                <div className="mt-4 text-right">
                                    <button className="btn btn-primary" onClick={submitForm}>
                                        Login
                                        <img
                                            style={{display: loading ? "inline" : "none"}}
                                            className="loading"
                                            src="./images/loading.gif"
                                            alt=""
                                        />
                                    </button>
                                    <div className="error">{props.error}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const actions = {
    loginUser,
    clearErrors,
};

const mapStateToProps = (state) => {
    return {
        userLoggedIn: state.user.userLoggedIn,
        error: state.errors.message,
    };
};

export default connect(mapStateToProps, actions)(Login);
