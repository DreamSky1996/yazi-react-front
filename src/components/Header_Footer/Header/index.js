import React from "react";
import "./header.css";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../../../actions/user_actions";
import {useHistory} from "react-router-dom";
import logo from "../../../util/images/logo.png"

function Header(props) {
    const history = useHistory();

    const logoutFunction = () => {
        props.logout().then((res) => {
            history.push("/login");
        });
    };

    const renderAuth = () => {
            let template;
            if (!props.userLoggedIn) {
                template = (
                    <>
                        <li className="social">
                            <Link to="/login">Login</Link>
                        </li>
                    </>
                );
            } else {
                template = (
                    <>
                        <li className="social">
                            <Link to="/checkout">
                                <i className="fas fa-shopping-cart"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to="/order-summary">
                                My Orders
                            </Link>
                        </li>
                        <li>&nbsp;</li>
                        <li onClick={logoutFunction} className="logout">
                            Logout
                        </li>
                    </>
                );
            }
            return template;
        };

    return (
        <header className="top-header">
            <div className="container d-flex">
                <div className="logo  align-self-center">
                    <Link to="/">
                        <img src={logo} alt=""/>
                    </Link>
                </div>
                <nav className="stellarnav light right desktop">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/shop/women">Shop Women</Link>
                            {/*<ul>*/}
                            {/*  <li>*/}
                            {/*    <Link to="#">Buy</Link>*/}
                            {/*  </li>*/}
                            {/*  <li>*/}
                            {/*    <Link to="#">Swap</Link>*/}
                            {/*  </li>*/}
                            {/*  <li>*/}
                            {/*    <Link to="#">Rent</Link>*/}
                            {/*  </li>*/}
                            {/*</ul>*/}
                        </li>
                        <li>
                            <Link to="/shop/men">Shop Men</Link>
                        </li>
                        <li>
                            <Link to="/shop/kids">Shop Kids</Link>
                        </li>
                    </ul>
                </nav>
                <ul className="slign-self-center links">{renderAuth()}</ul>
            </div>
        </header>
    );
}

const mapStateToProps = (state) => {
        return {
            userLoggedIn: state.user.userLoggedIn,
            userType: state.user.type,
        };
    }
;

const actions =
    {
        logout,
    }
;

export default connect(mapStateToProps, actions)(Header);
