import React, {useState, useEffect, useMemo} from "react";
import {Link} from "react-router-dom";
import "./checkout.css";
import {connect} from "react-redux";
import {getCart, updateOrder, proceedOrderPlace} from "../../../actions/user_actions";
import Loader from "../../../components/util/loader";
import countryList from 'react-select-country-list';
import Select from 'react-select';
import {useHistory} from "react-router-dom";

function Checkout(props) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [disableOrderIndex, setDisableOrderIndex] = useState(-1);
    const [totalPrice, setTotalPrice] = useState(0);
//shipping
    const [address, setAddress] = useState(props.user.address);
    const [fullname, setFullname] = useState(props.user.name);
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState(props.user.email);
    const [phone, setPhone] = useState("");
    const [otherPhone, setOtherPhone] = useState("");
    const [otherAddress, setOtherAddress] = useState(props.user.address);
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [postCode, setPostCode] = useState("");
    const [cellPhone, setCellPhone] = useState("");
    const [country, setCountry] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [error, setError] = useState("");
    const [currentStep, setCurrentStep] = useState(0);
    const [stepClass0, setStepClass0] = useState("process");
    const [stepClass1, setStepClass1] = useState("");
    const [stepClass2, setStepClass2] = useState("");
    const [stepDiv0, setStepDiv0] = useState({display: "block"});
    const [stepDiv1, setStepDiv1] = useState({display: "none"});
    const [stepDiv2, setStepDiv2] = useState({display: "none"});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCVC, setCardCVC] = useState("");
    const [cardHolderName, setCardHolderName] = useState("");
    const history = useHistory();
    const countryOptions = useMemo(() => countryList().getData(), []);

    const stepHandler = (step) => {
        if (step == 0 && isSubmitted == false) {
            setCurrentStep(step)
            setStepClass0('process');
            setStepClass1('');
            setStepClass2('');
            setStepDiv0({display: 'block'});
            setStepDiv1({display: 'none'});
            setStepDiv2({display: 'none'});
        }
        if (step == 1 && isSubmitted == false) {
            setCurrentStep(step)
            setStepClass0('complete');
            setStepClass1('process');
            setStepClass2('');
            setStepDiv0({display: 'none'});
            setStepDiv1({display: 'block'});
            setStepDiv2({display: 'none'});
        }
        if (step == 2 && isSubmitted == false) {
            setCurrentStep(step)
            setStepClass0('complete');
            setStepClass1('complete');
            setStepClass2('process');
            setStepDiv0({display: 'none'});
            setStepDiv1({display: 'none'});
            setStepDiv2({display: 'block'});
        }
    }

    const submitForm = (event) => {
        if (currentStep < 2) {
            stepHandler(currentStep + 1);
            return
        }
        event.preventDefault();
        let dataToSubmit = {orders, address, fullname, company, email, phone, otherPhone, otherAddress, city, province, postCode, cellPhone, cardNumber, cardExpiry, cardCVC, cardHolderName}
        setLoading(true);
        proceedOrderPlace(dataToSubmit)
            .then((res) => {
                setLoading(false);
                setError("");
                setIsSubmitted(true);
                setOrders([]);
                setTotalPrice(0);
                if (res.message === "Order Placed!") {
                    history.push("/order-summary");
                    props.clearErrors();
                }
            })
            .catch((err) => {
                setLoading(false);
                setError(err.message);
            });
    };

    useEffect(() => {
        setLoading(true);
        getCart("pending")
            .then((data) => {
                setOrders(data.orders);
                const TP = data.orders.reduce((acc, curr) => {
                    return acc + curr.price;
                }, 0);
                setTotalPrice(TP);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    }, []);

    const changeQuantity = (quantity, i, operation) => {
        setDisableOrderIndex(i);
        const oldOrders = [...orders];
        const newOrder = {...oldOrders[i]};
        newOrder.quantity = quantity;
        let newPrice;
        let TP = totalPrice;
        if (operation === "+") {
            newPrice = newOrder.price + newOrder.product.price;
            TP += newOrder.product.price
        } else if (operation === "-") {
            newPrice = newOrder.price - newOrder.product.price;
            TP -= newOrder.product.price
        }
        newOrder.price = newPrice;
        oldOrders[i] = newOrder;
        setOrders(oldOrders);
        updateOrder({operation, orderId: newOrder._id}).then((result) => {
            if (result.message === "Order updated successfully")
                setDisableOrderIndex(-1);
            setTotalPrice(TP)
        });
    };

    if (orders.length > 0) {
        return (
            <div className="checkout page-wrapper">
                <div className="container">
                    <div className="row justify-content-end">
                        <div className="col-lg-11 clearfix">
                            <h3>Checkout</h3>
                            <div className="row">
                                <div className="col-lg-8 col-xl-7 mt-4">
                                    <div className="steps">
                                        <ul>
                                            <li className={stepClass0}>
                                          <span style={{cursor: 'pointer'}} onClick={() => {
                                              stepHandler(0);
                                          }}>
                                            <strong>1</strong> Step 1
                                          </span>
                                            </li>
                                            <li className={stepClass1}>
                                          <span style={{cursor: 'pointer'}} onClick={() => {
                                              stepHandler(1);
                                          }}>
                                            <strong>2</strong> Step 2
                                          </span>
                                            </li>
                                            <li className={stepClass2}>
                                          <span style={{cursor: 'pointer'}} onClick={() => {
                                              stepHandler(2);
                                          }}>
                                            <strong>3</strong> Step 3
                                          </span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div style={stepDiv0} className="payment-form mt-5">
                                        <div className="mb-5">
                                            <label className="d-block">
                                                <strong>Payment Method</strong>
                                            </label>
                                            <input type="radio" id="pm1" name="pm"/>
                                            <label htmlFor="pm1" className="mr-4">
                                                <span></span>
                                                <img src="images/p1.png" alt=""/>
                                            </label>
                                            <input type="radio" id="pm2" name="pm"/>
                                            <label htmlFor="pm2">
                                                <span></span>
                                                <img src="images/p2.png" alt=""/>
                                            </label>
                                        </div>

                                        <div className="mb-5">
                                            <label className="d-block">
                                                <strong>Delivery Method</strong>
                                            </label>
                                            <input type="radio" id="dm1" name="dm"/>
                                            <label htmlFor="dm1" className="mb-2 d-block">
                                                <span></span>
                                                <img src="images/s1.png" alt=""/>
                                            </label>
                                            <input type="radio" id="dm2" name="dm"/>
                                            <label htmlFor="dm2" className="mb-2 d-block">
                                                <span></span>
                                                <img src="images/s2.png" alt=""/>
                                            </label>
                                        </div>
                                    </div>
                                    <div style={stepDiv1} className="row mt-5 mb-4">
                                        <div className="col-sm-12 mb-4">
                                            <h4>Shipping Details</h4>
                                        </div>
                                        <div className="col-sm-8 mb-4">
                                            <input value={fullname} onChange={(e) => setFullname(e.target.value)}
                                                   placeholder="Enter Fullname" type="text" className="form-control"/>
                                        </div>
                                        <div className="col-sm-8 mb-4">
                                            <input value={company} onChange={(e) => setCompany(e.target.value)}
                                                   placeholder="Company Name" type="text" className="form-control"/>
                                        </div>
                                        <div className="col-sm-8 mb-4">
                                            <input value={email} onChange={(e) => setEmail(e.target.value)}
                                                   placeholder="Enter Email" type="text" className="form-control"/>
                                        </div>
                                        <div className="col-sm-8 mb-4">
                                            <input value={phone} onChange={(e) => setPhone(e.target.value)}
                                                   placeholder="Enter Phone" type="text" className="form-control"/>
                                        </div>
                                        <div className="col-sm-8 mb-4">
                                            <input value={otherPhone} onChange={(e) => setOtherPhone(e.target.value)}
                                                   placeholder="Enter Other Phone" type="text"
                                                   className="form-control"/>
                                        </div>
                                        <div className="col-sm-8 mb-4">
                                            <Select options={countryOptions} value={country} onChange={(country) => {
                                                setCountry(country);
                                                setCountryCode(country.value);
                                            }} classNamePrefix="custom-select"/>
                                        </div>
                                        <div className="col-sm-8 mb-4">
                                            <input value={address} onChange={(e) => setAddress(e.target.value)}
                                                   placeholder="Enter Address" type="text" className="form-control"/>
                                        </div>
                                        <div className="col-sm-8 mb-4">
                                            <input value={otherAddress}
                                                   onChange={(e) => setOtherAddress(e.target.value)}
                                                   placeholder="Enter Other address" type="text"
                                                   className="form-control"/>
                                        </div>
                                        <div className="col-sm-8 mb-4">
                                            <input value={city} onChange={(e) => setCity(e.target.value)}
                                                   placeholder="Enter City" type="text" className="form-control"/>
                                        </div>
                                        <div className="col-sm-8 mb-4">
                                            <input value={province} onChange={(e) => setProvince(e.target.value)}
                                                   placeholder="Enter Province" type="text" className="form-control"/>
                                        </div>
                                        <div className="col-sm-8 mb-4">
                                            <input value={postCode} onChange={(e) => setPostCode(e.target.value)}
                                                   placeholder="Enter Post Code" type="text" className="form-control"/>
                                        </div>
                                        <div className="col-sm-8 mb-4">
                                            <input value={cellPhone} onChange={(e) => setCellPhone(e.target.value)}
                                                   placeholder="Enter CellPhone" type="text" className="form-control"/>
                                        </div>
                                    </div>
                                    <div style={stepDiv2} className="row mt-5 mb-4">
                                        <div className="col-sm-12 mb-4 mt-5">
                                            <div className="col-sm-8 mb-4">
                                                <input value={cardHolderName}
                                                       onChange={(e) => setCardHolderName(e.target.value)}
                                                       placeholder="Enter Card Holder Fullname" type="text"
                                                       className="form-control"/>
                                            </div>
                                            <div className="col-sm-8 mb-4">
                                                <input value={cardNumber}
                                                       onChange={(e) => setCardNumber(e.target.value)}
                                                       placeholder="Enter Card Number" type="text"
                                                       className="form-control"/>
                                            </div>
                                            <div className="col-sm-8 mb-4">
                                                <input value={cardExpiry}
                                                       onChange={(e) => setCardExpiry(e.target.value)}
                                                       placeholder="Enter Expiry" type="text" className="form-control"/>
                                            </div>
                                            <div className="col-sm-8 mb-4">
                                                <input value={cardCVC} onChange={(e) => setCardCVC(e.target.value)}
                                                       placeholder="Enter CVC" type="text" className="form-control"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="clearfix">
                                        <Link to="/shop" className="btn btn-link float-left">
                                            &larr; Return to shop
                                        </Link>
                                        <button
                                            type="submit"
                                            className="btn btn-primary float-right"
                                            onClick={submitForm}
                                        >
                                            Continue &rarr;
                                        </button>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-xl-5 mt-4">
                                    <div className="order-list">
                                        <div className="row no-gutters">
                                            <div className="col-9">
                                                <h5>Order Total ({orders.length})</h5>
                                            </div>
                                            <div className="col-3 text-right align-self-center">
                                                Edit
                                            </div>
                                        </div>
                                        {loading ? (<Loader/>) : (
                                            orders.length > 0 &&
                                            orders.map((order, i) => {
                                                if (order.quantity < 1) {
                                                    return (<></>)
                                                }
                                                return (
                                                    <div key={order._id} className="media">
                                                        <div
                                                            style={{
                                                                display: `${
                                                                    disableOrderIndex === i ? "block" : "none"
                                                                }`,
                                                            }}
                                                            className="disable"
                                                        ></div>
                                                        <div className="thumb">
                                                            <img
                                                                src="https://i.pinimg.com/originals/d7/be/2a/d7be2a0cc36277ba0d5fcb3b325389a5.jpg"
                                                                // src={`http://127.0.0.1:9090/${order.product.images[0]}`}
                                                                alt=""
                                                                className="img-crop"
                                                            />
                                                        </div>
                                                        <div className="media-body">
                                                            <p>
                                                                <strong>{order.product.name}</strong>
                                                            </p>
                                                            <div className="spinner clearfix">
                                                                <div
                                                                    className="input-group input-group-spinner">
                                                                    <div className="input-group-prepend">
                                                                        <button
                                                                            style={{minWidth: "undefined"}}
                                                                            className="btn btn-decrement btn-outline-secondary"
                                                                            type="button"
                                                                            onClick={() => {
                                                                                changeQuantity(
                                                                                    order.quantity - 1,
                                                                                    i,
                                                                                    "-"
                                                                                );
                                                                            }}
                                                                        >
                                                                            -
                                                                        </button>
                                                                    </div>
                                                                    <input
                                                                        style={{
                                                                            textAlign: "center",
                                                                            paddingLeft: "15px",
                                                                        }}
                                                                        className="quantity-input input"
                                                                        type="number"
                                                                        value={order.quantity}
                                                                        min="1"
                                                                        max="100"
                                                                    />
                                                                    <div className="input-group-append">
                                                                        <button
                                                                            style={{minWidth: "undefine"}}
                                                                            className="btn btn-increment btn-outline-secondary"
                                                                            type="button"
                                                                            onClick={() => {
                                                                                changeQuantity(
                                                                                    order.quantity + 1,
                                                                                    i,
                                                                                    "+"
                                                                                );
                                                                            }}
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span className="price">${order.price}</span>
                                                    </div>
                                                );
                                            })
                                        )}

                                        <div className="total">
                                            <div className="row">
                                                <div className="col-6">Shipping</div>
                                                <div className="col-6 text-right">$0</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">Order Total</div>
                                                <div className="col-6 text-right">${totalPrice}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="checkout page-wrapper">
                <div className="container">
                    <div className="row justify-content-end">
                        <div className="col-lg-11 clearfix">
                            <h3>Cart Page</h3>
                            <div className="row">
                                <div className="col-lg-8 col-xl-7 mt-4">
                                    <div className="steps">
                                        <h5>You have nothing in your cart yet.</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapState)(Checkout);
