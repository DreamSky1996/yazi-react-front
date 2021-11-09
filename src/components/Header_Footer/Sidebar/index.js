import React, {useState, useEffect} from "react";
import "./sidebar.css";
import {Link, useHistory} from "react-router-dom";
import Slider from "react-slick";
import {getRecentProducts} from "../../../actions/products_actions";
import {
    getCartTotal,
    postToCart,
    subscribe,
} from "../../../actions/user_actions";
import load from "../../../util/images/loading.gif";

export default function Sidebar(props) {
    const [sidebar, openSidebar] = useState(false);
    const [products, setProducts] = useState([]);
    const history = useHistory();
    const [cartTotal, setCartTotal] = useState(0);
    const [actionLoading, setActionLoading] = useState(false);
    const [sendingEmail, setSendingEmail] = useState(false);
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");
    const [config, setConfig] = useState({
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 4,
        rows: 1,
        autoplay: false,
    });

    useEffect(() => {
        getRecentProducts().then((newProducts) => {
            setProducts(newProducts);
            getCartTotal().then((total) => {
                if (total) setCartTotal(total);
            });
        });
    }, []);

    const addToCart = (productId) => {
        setActionLoading(true);
        postToCart({size: "M", quantity: 1, productId: productId})
            .then((res) => {
                setActionLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const subscribee = () => {
        setSendingEmail(true);

        subscribe(email).then((message) => {
            setMsg(message);
            setTimeout(() => {
                setMsg("");
            }, 2500);
            setSendingEmail(false);
            setEmail("");
        });
    };

    return (
        <>
            <div
                className={`menu-toggle ${sidebar ? "inactive" : ""}`}
                onClick={() => openSidebar(!sidebar)}
            >
                <span className="menu-toggle sr-only">Menu Toggle</span>
            </div>
            <aside className={`sidebar ${sidebar ? "active" : ""}`}>
                <div className="sidebar-content">
                    <div className="sidebar-menu">
                        <ul className="main-menu" id="side-menu">
                            <li>
                                <Link
                                    to={{
                                        pathname: "/shop/women",
                                        state: {
                                            clothType: "women",
                                        },
                                    }}
                                >
                                    Womens
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={{
                                        pathname: "/shop/men",
                                        state: {
                                            clothType: "men",
                                        },
                                    }}
                                >
                                    Men
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={{
                                        pathname: "/shop/kids",
                                        state: {
                                            clothType: "kids",
                                        },
                                    }}
                                >
                                    Kids
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <Link to="/orders" className="cart">
                        <span>{cartTotal}</span>
                    </Link>
                    <a href="#w1" className="scroll-down page-scroll">
                        <span className="sr-only">Scroll Down</span>
                    </a>
                </div>
            </aside>
        </>
    );
}
