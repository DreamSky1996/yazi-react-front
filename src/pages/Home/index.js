import React, {useState, useEffect, useRe} from "react";
import "./home.css";
import {connect} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import Slider from "react-slick";
import {getRecentProducts} from "../../actions/products_actions";
import {
    getCartTotal,
    postToCart,
    subscribe,
} from "../../actions/user_actions";
import Sidebar from '../../components/Header_Footer/Sidebar/index';
import load from "../../util/images/loading.gif";
import banner1 from "../../util/images/depositphotos_202841410.jpg";
import banner2 from "../../util/images/depositphotos_202842676.jpg";
import AwesomeSlider from 'react-awesome-slider';
import "../../util/css/slider.css";

function Home(props) {
    const history = useHistory();
    const [sidebar, openSidebar] = useState(false);
    const [products, setProducts] = useState([]);
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
                console.log(res);
                setActionLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const renderCartOptions = (product) => {
        let template;
        if (!props.user.userLoggedIn) {
            template = (
                <>
                    <li className="social">
                        <Link to="/login">
                            <button className="add btn btn-primary">
                                {actionLoading ? ( <img className="loading" src={load} alt="" /> ) : ("Add to Bag")}
                            </button>
                        </Link>
                    </li>
                </>
            );
        } else {
            template = (
                <>
                    <button onClick={() => { addToCart(product._id); }} className="add btn btn-primary">
                        {actionLoading ? ( <img className="loading" src={load} alt=""/> ) : ( "Add to Bag" )}
                    </button>
                </>
            );
        }
        return template;
    }
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
        <div className="landing">

            <div className="col-lg-12 home-slider">
                <div className="banner">
                    <div className="owl-carousel owl-theme CarouselOwlSlider">
                        <AwesomeSlider>
                            <div className="item">
                                <div className="carousel-caption">
                                    <h2>Benefits Of Clothes Swapping</h2>
                                    <p>Lorem ipsum dolor sit amet, nec eu zril fierent. Primis vivendum euripidis ea
                                        pri. </p>
                                    <a href="#" className="btn btn-primary">Log in/register </a>
                                </div>
                                <div className="banner-img">
                                    <img src={banner1} alt=""/>
                                </div>
                                <div className="overlay"></div>
                            </div>
                            <div className="item">
                                <div className="carousel-caption">
                                    <h2>Benefits Of Clothes Swapping</h2>
                                    <p>Lorem ipsum dolor sit amet, nec eu zril fierent. Primis vivendum euripidis ea
                                        pri. </p>
                                    <a href="#" className="btn btn-primary">Log in/register </a>
                                </div>
                                <div className="banner-img">
                                    <img src={banner2} alt=""/>
                                </div>
                                <div className="overlay"></div>
                            </div>
                        </AwesomeSlider>
                    </div>
                </div>
            </div>

            <div className="trending" id="w1">
                <div className="container">
                    <div className="mb-3">
                        <h3>Trending of the day</h3>
                    </div>
                    <div className="trending-carousel">
                        <div className="owl-carousel owl-theme CarouselOwlTrending">
                            {products.length > 0 ? (
                                <Slider {...config}>
                                    {products.map((product, i) => {
                                        return (
                                            <div key={product._id} className="item">
                                                <div className="content">
                                                    <div className="inner-content coleql_height">
                                                        <small
                                                            onClick={() =>
                                                                history.push(
                                                                    "/seller-profile/" + product.creator._id
                                                                )
                                                            }
                                                            className="d-block mb-2"
                                                        >
                                                            By {product.creator.name}
                                                        </small>
                                                        <div className="embed-responsive embed-responsive-1by1">
                                                            <Link to={`/product/${product._id}`}>
                                                                <div className="full-img">
                                                                    <img
                                                                        src="https://i.pinimg.com/originals/d7/be/2a/d7be2a0cc36277ba0d5fcb3b325389a5.jpg"
                                                                        // src={`http://127.0.0.1:9090/${product.images[0]}`}
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            </Link>
                                                        </div>
                                                        <div className="overlay">
                                                            <p>{product.name}</p>
                                                            <ul>
                                                                <li>${product.price}</li>
                                                                <li>
                                                                    <i className="far fa-heart"></i>
                                                                </li>
                                                                <li>
                                                                    {renderCartOptions(product)}
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </Slider>
                            ) : (
                                <div className="no-products-found">No Products Found</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bottom-content">
                <div className="container">
                    <div className="first-content">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="full-img">
                                    <img src="images/img-6.png" alt=""/>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="row no-gutters">
                                    <div className="col-lg-6">
                                        <div className="full-img">
                                            <img src="images/img-7.png" alt=""/>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 align-self-center">
                                        <div className="content">
                                            <h4>
                                                <a href="#">Benefits Of Clothes Swapping</a>
                                            </h4>
                                            <p>
                                                <i className="far fa-calendar-alt mr-2"></i>March 13,
                                                2021
                                            </p>
                                            <p>
                                                Lorem ipsum dolor sit amet, nec eu zril fierent. Primis
                                                vivendum euripidis ea pri. Case moderatius mei ut, has
                                                congue detracto luptatum an. Quando sadipscing eum ne,
                                                qui quodsi tractatos salutatus eu, vel ne vide atomorum
                                                hendrerit. Natum omnis eirmod his ea. In iriure iisque
                                                mei.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="reviews">
                        <div className="row">
                            <div className="col-md-4 mt-4">
                                <div className="review-content coleql_height">
                                    <div className="media mb-4">
                                        <img src="images/user.svg" className="user mr-2" alt=""/>
                                        <div className="media-body">
                                            <h5>Sharah St</h5>
                                            <img src="images/star.png" alt=""/>
                                        </div>
                                    </div>
                                    <p>
                                        Lorem ipsum dolor sit amet, nec eu zril fierent. Primis
                                        vivendum euripidis ea pri. Case moderatius mei ut, has
                                        congue detracto luptatum an.
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-4 mt-4">
                                <div className="review-content coleql_height">
                                    <div className="media mb-4">
                                        <img src="images/user.svg" className="user mr-2" alt=""/>
                                        <div className="media-body">
                                            <h5>Sharah St</h5>
                                            <img src="images/star.png" alt=""/>
                                        </div>
                                    </div>
                                    <p>
                                        Lorem ipsum dolor sit amet, nec eu zril fierent. Primis
                                        vivendum euripidis ea pri. Case moderatius mei ut, has
                                        congue detracto luptatum an.
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-4 mt-4">
                                <div className="review-content coleql_height">
                                    <div className="media mb-4">
                                        <img src="images/user.svg" className="user mr-2" alt=""/>
                                        <div className="media-body">
                                            <h5>Sharah St</h5>
                                            <img src="images/star.png" alt=""/>
                                        </div>
                                    </div>
                                    <p>
                                        Lorem ipsum dolor sit amet, nec eu zril fierent. Primis
                                        vivendum euripidis ea pri. Case moderatius mei ut, has
                                        congue detracto luptatum an..
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapState = (state) => ({
    user: state.user,
});

export default connect(mapState)(Home);