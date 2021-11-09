import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import "./product.css";
import next from "../../util/images/next.png";
import back from "../../util/images/prev.png";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {getProduct} from "../../actions/products_actions";
import Loader from "../../components/util/loader";
import img2 from "../../util/images/img-2.jpg";
import img3 from "../../util/images/img-3.jpg";
import img4 from "../../util/images/img-4.jpg";
import img5 from "../../util/images/img-5.jpg";
import p1 from "../../util/images/p1.png";
import p2 from "../../util/images/p2.png";
import s1 from "../../util/images/s1.png";
import s2 from "../../util/images/s2.png";
import star from "../../util/images/star.png";
import user from "../../util/images/user.svg";
import load from "../../util/images/loading.gif";
import {AiFillStar as Star} from "react-icons/ai";
import {
    postToCart,
    postToFav,
    checkFavItem,
} from "../../actions/user_actions";

function ProductDetail(props) {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("S");
    const [msg, setMsg] = useState("");
    const [favProduct, setFavProduct] = useState(false);

    const [buyerReview, setBuyerReview] = useState({});
    const [actionLoading, setActionLoading] = useState(false);

    const ArrowLeft = ({currentSlide, slideCount, ...props}) => (
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

    useEffect(() => {
        setLoading(true);
        const productId = props.match.params.id;
        getProduct(productId).then(product => {
            setProduct(product);
            setLoading(false);
            checkFavItem(productId).then((exist) => {
                if (exist) setFavProduct(true);
            });
        });
    }, []);

    const addToCart = () => {
        const productId = props.match.params.id;
        setActionLoading(true);
        postToCart({size: size, quantity: quantity, productId: productId})
            .then((res) => {
                setActionLoading(false);
                setMsg("added successfully");

                setTimeout(() => {
                    setMsg("");
                }, 500);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const ArrowRight = ({currentSlide, slideCount, ...props}) => (
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
        prevArrow: <ArrowLeft/>,
        nextArrow: <ArrowRight/>,
        rows: 1,
        autoplay: true,
        autoplaySpeed: 2500,
    });

    const addToFavourite = () => {
        const productId = product._id;
        postToFav(productId).then((message) => {
            console.log(message);
            if (message === "product added to fav successfully") setFavProduct(true);
            else if (message === "product removed from fav successfully")
                setFavProduct(false);
        });
    };

    const getBuyerReview = () => {
        let review;
        if (product.reviews && product.reviews.length > 0) {
            const reviewIndex = product.reviews.findIndex((rev) => {
                return rev.userId === props.user.userId;
            });
            if (reviewIndex === -1)
                review = "You dont have any reviews for this product";
            else review = product.reviews[reviewIndex];
        } else {
            review = "You dont have any reviews for this product";
        }
        setBuyerReview(review);
    };

    useEffect(() => {
        if (!(typeof product == 'undefined')) {
            if (Object.keys(product).length > 0) getBuyerReview();
        }
    }, [product]);

    const calculateReviewsRate = () => {
    };

    const calculateReviewsNumber = () => {
        if (product.reviews) {
            if (product.reviews.length === 1) {
                return " " + product.reviews.length + " Review";
            } else {
                return " " + product.reviews.length + " Reviews";
            }
        } else {
            return " 0 Reviews";
        }
    };

    return (
        <>
            <div className="banner-container">
                <div className="container">
                    <div className="row justify-content-end">
                        {loading ? (
                            <Loader/>
                        ) : (
                            <div className="col-lg-11 clearfix">
                                <div className="row">
                                    <div className="col-lg-6 home-slider product-slider mb-5">
                                        <Slider {...config}>
                                            {product.images.map((image) => {
                                                return (
                                                    <div key={image} className="item full-img">
                                                        <img
                                                            // src={`http://127.0.0.1:9090/${image}`}
                                                            src="https://i.pinimg.com/originals/d7/be/2a/d7be2a0cc36277ba0d5fcb3b325389a5.jpg"
                                                            alt=""
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </Slider>
                                    </div>

                                    <div className="col-lg-6 product-details mb-5">
                                        <div className="designer mb-2">
                                            <small>By</small> {product.creator.name}
                                        </div>
                                        <div className="product-reviews mb-2">
                      <span className="rating">
                        <img src={star} alt=""/>
                      </span>
                                            {calculateReviewsNumber()} <span></span>
                                        </div>
                                        <h1>{product.name}</h1>
                                        <div className="short-info mb-2">
                                            <p> {product.description}</p>
                                        </div>
                                        <div className="price mb-2">${product.price}</div>

                                        <div className="mb-3">
                                            <div className="spinner clearfix">
                                                <div className="input-group input-group-spinner">
                                                    <div className="input-group-prepend">
                                                        <button
                                                            style={{minWidth: "undefined"}}
                                                            className="btn btn-decrement btn-outline-secondary"
                                                            type="button"
                                                            onClick={() => {
                                                                quantity > 1 && setQuantity(quantity - 1);
                                                            }}
                                                        >
                                                            -
                                                        </button>
                                                    </div>
                                                    <input
                                                        style={{textAlign: "center", paddingLeft: "15px"}}
                                                        className="quantity-input input"
                                                        type="number"
                                                        value={quantity}
                                                        min="1"
                                                        max="100"
                                                        step="1"
                                                        onChange={(e) => setQuantity(e.target.value)}
                                                    />
                                                    <div className="input-group-append">
                                                        <button
                                                            style={{minWidth: "undefine"}}
                                                            className="btn btn-increment btn-outline-secondary"
                                                            type="button"
                                                            onClick={() => setQuantity(quantity + 1)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="d-block">Size</label>
                                            {product.size.includes("S") && (
                                                <>
                                                    <input
                                                        value="S"
                                                        type="radio"
                                                        id="s1"
                                                        name="size"
                                                        checked={size === "S"}
                                                        onClick={() => {
                                                            setSize("S");
                                                        }}
                                                        onChange={() => setSize("S")}
                                                    />
                                                    <label htmlFor="s1">S</label>
                                                </>
                                            )}

                                            {product.size.includes("M") && (
                                                <>
                                                    <input
                                                        className={
                                                            product.size.includes("M") ? "" : "disable"
                                                        }
                                                        value="M"
                                                        type="radio"
                                                        id="s2"
                                                        name="size"
                                                        checked={size === "M"}
                                                        onClick={() => {
                                                            setSize("M");
                                                        }}
                                                        onChange={() => setSize("M")}
                                                    />
                                                    <label htmlFor="s2">M</label>
                                                </>
                                            )}
                                            {product.size.includes("L") && (
                                                <>
                                                    <input
                                                        onClick={() => {
                                                            setSize("L");
                                                        }}
                                                        value="L"
                                                        type="radio"
                                                        id="s3"
                                                        name="size"
                                                        checked={size === "L"}
                                                        onChange={() => setSize("L")}
                                                        className={
                                                            product.size.includes("L") ? "" : "disable"
                                                        }
                                                    />
                                                    <label htmlFor="s3">L</label>
                                                </>
                                            )}
                                        </div>
                                        <div className="mb-3 row">
                                            <div className="col-8">
                                                <button
                                                    onClick={() => addToCart()}
                                                    style={{position: "relative"}}
                                                    disabled={loading}
                                                    className={`btn btn-primary btn-block ${
                                                        props.user.userType === "seller" ? "disable" : ""
                                                    }`}
                                                >
                                                    Add to Cart
                                                    <img
                                                        className="loading"
                                                        src={load}
                                                        alt=""
                                                        style={{
                                                            display: actionLoading ? "inline" : "none",
                                                        }}
                                                    />
                                                </button>
                                                <div className="confirm-msg">{msg}</div>
                                            </div>
                                            <div className="col-4">
                                                <button
                                                    style={{color: `${favProduct ? "red" : "#0b124b"}`}}
                                                    onClick={addToFavourite}
                                                    className="wishlist"
                                                >
                                                    <i className="far fa-heart"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <p>You will earn around 125 points</p>
                                    </div>
                                </div>

                                {typeof buyerReview === "string" ? (
                                    <div className="media pp-lg mb-4" style={{fontSize: "24px"}}>{buyerReview}</div>
                                ) : (
                                    <div className="media pp-lg mb-4">
                                        <img src={user} className="user" alt=""/>
                                        <div className="media-body">
                                            <div className="mb-3">
                                                <h5>{props.user.name}</h5>
                                                <div class="rating">
                                                    <Star
                                                        color={`${buyerReview.starRate > 0 && "goldenrod"}`}
                                                    />
                                                    <Star
                                                        color={`${buyerReview.starRate > 1 && "goldenrod"}`}
                                                    />
                                                    <Star
                                                        color={`${buyerReview.starRate > 2 && "goldenrod"}`}
                                                    />
                                                    <Star
                                                        color={`${buyerReview.starRate > 3 && "goldenrod"}`}
                                                    />
                                                    <Star
                                                        color={`${buyerReview.starRate > 4 && "goldenrod"}`}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <p>{buyerReview.review}</p>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <p>Payment Method</p>
                                                    <ul className="list-inline">
                                                        <li className="list-inline-item">
                                                            <img src={p1} alt=""/>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <img src={p2} alt=""/>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>Shipping Method</p>
                                                    <ul className="list-inline">
                                                        <li className="list-inline-item">
                                                            <img src={s1} alt=""/>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <img src={s2} alt=""/>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="single-product-review">
                <div className="container">
                    <div className="reviews">
                        <div className="row">
                            <div className="col-md-4 mt-4">
                                <div className="review-content coleql_height">
                                    <div className="media mb-4">
                                        <img src={user} className="user mr-2" alt=""/>
                                        <div className="media-body">
                                            <h5>Sharah St</h5>
                                            <img src={star} alt=""/>
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
                                        <img src={user} className="user mr-2" alt=""/>
                                        <div className="media-body">
                                            <h5>Sharah St</h5>
                                            <img src={star} alt=""/>
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
                                        <img src={user} className="user mr-2" alt=""/>
                                        <div className="media-body">
                                            <h5>Sharah St</h5>
                                            <img src={star} alt=""/>
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

            <div className="bottom-content bottom-content-page">
                <div style={{display: "none"}} className="container">
                    <div className="trending related-product">
                        <div className="mb-3 text-center">
                            <h3>You may also like</h3>
                        </div>
                        <div className="trending-carousel">
                            <div className="owl-carousel owl-theme CarouselOwlTrending">
                                <div className="item">
                                    <div className="content">
                                        <div className="inner-content coleql_height">
                                            <small className="d-block mb-2">By Jacqui E</small>
                                            <div className="embed-responsive embed-responsive-1by1">
                                                <div className="full-img">
                                                    <img src={img2} alt=""/>
                                                </div>
                                            </div>
                                            <div className="overlay">
                                                <p>Yellow Scalloped Lace Up</p>
                                                <ul>
                                                    <li>$17</li>
                                                    <li>
                                                        <i className="far fa-heart"></i>
                                                    </li>
                                                    <li>
                                                        <button className="btn btn-primary">
                                                            ADD TO BAG
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="content">
                                        <div className="inner-content coleql_height">
                                            <small className="d-block mb-2">By Jacqui E</small>
                                            <div className="embed-responsive embed-responsive-1by1">
                                                <div className="full-img">
                                                    <img src={img3} alt=""/>
                                                </div>
                                            </div>
                                            <div className="overlay">
                                                <p>Yellow Scalloped Lace Up</p>
                                                <ul>
                                                    <li>$17</li>
                                                    <li>
                                                        <i className="far fa-heart"></i>
                                                    </li>
                                                    <li>
                                                        <button className="btn btn-primary">
                                                            ADD TO BAG
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="content">
                                        <div className="inner-content coleql_height">
                                            <small className="d-block mb-2">By Jacqui E</small>
                                            <div className="embed-responsive embed-responsive-1by1">
                                                <div className="full-img">
                                                    <img src={img4} alt=""/>
                                                </div>
                                            </div>
                                            <div className="overlay">
                                                <p>Yellow Scalloped Lace Up</p>
                                                <ul>
                                                    <li>$17</li>
                                                    <li>
                                                        <i className="far fa-heart"></i>
                                                    </li>
                                                    <li>
                                                        <button className="btn btn-primary">
                                                            ADD TO BAG
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="content">
                                        <div className="inner-content coleql_height">
                                            <small className="d-block mb-2">By Jacqui E</small>
                                            <div className="embed-responsive embed-responsive-1by1">
                                                <div className="full-img">
                                                    <img src={img5} alt=""/>
                                                </div>
                                            </div>
                                            <div className="overlay">
                                                <p>Yellow Scalloped Lace Up</p>
                                                <ul>
                                                    <li>$17</li>
                                                    <li>
                                                        <i className="far fa-heart"></i>
                                                    </li>
                                                    <li>
                                                        <button className="btn btn-primary">
                                                            ADD TO BAG
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="content">
                                        <div className="inner-content coleql_height">
                                            <small className="d-block mb-2">By Jacqui E</small>
                                            <div className="embed-responsive embed-responsive-1by1">
                                                <div className="full-img">
                                                    <img src={img2} alt=""/>
                                                </div>
                                            </div>
                                            <div className="overlay">
                                                <p>Yellow Scalloped Lace Up</p>
                                                <ul>
                                                    <li>$17</li>
                                                    <li>
                                                        <i className="far fa-heart"></i>
                                                    </li>
                                                    <li>
                                                        <button className="btn btn-primary">
                                                            ADD TO BAG
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="content">
                                        <div className="inner-content coleql_height">
                                            <small className="d-block mb-2">By Jacqui E</small>
                                            <div className="embed-responsive embed-responsive-1by1">
                                                <div className="full-img">
                                                    <img src={img3} alt=""/>
                                                </div>
                                            </div>
                                            <div className="overlay">
                                                <p>Yellow Scalloped Lace Up</p>
                                                <ul>
                                                    <li>$17</li>
                                                    <li>
                                                        <i className="far fa-heart"></i>
                                                    </li>
                                                    <li>
                                                        <button className="btn btn-primary">
                                                            ADD TO BAG
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="content">
                                        <div className="inner-content coleql_height">
                                            <small className="d-block mb-2">By Jacqui E</small>
                                            <div className="embed-responsive embed-responsive-1by1">
                                                <div className="full-img">
                                                    <img src={img4} alt=""/>
                                                </div>
                                            </div>
                                            <div className="overlay">
                                                <p>Yellow Scalloped Lace Up</p>
                                                <ul>
                                                    <li>$17</li>
                                                    <li>
                                                        <i className="far fa-heart"></i>
                                                    </li>
                                                    <li>
                                                        <button className="btn btn-primary">
                                                            ADD TO BAG
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="content">
                                        <div className="inner-content coleql_height">
                                            <small className="d-block mb-2">By Jacqui E</small>
                                            <div className="embed-responsive embed-responsive-1by1">
                                                <div className="full-img">
                                                    <img src={img5} alt=""/>
                                                </div>
                                            </div>
                                            <div className="overlay">
                                                <p>Yellow Scalloped Lace Up</p>
                                                <ul>
                                                    <li>$17</li>
                                                    <li>
                                                        <i className="far fa-heart"></i>
                                                    </li>
                                                    <li>
                                                        <button className="btn btn-primary">
                                                            ADD TO BAG
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
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
                                        <img src={user} className="user mr-2" alt=""/>
                                        <div className="media-body">
                                            <h5>Sharah St</h5>
                                            <img src={star} alt=""/>
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
                                        <img src={user} className="user mr-2" alt=""/>
                                        <div className="media-body">
                                            <h5>Sharah St</h5>
                                            <img src={star} alt=""/>
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
                                        <img src={user} className="user mr-2" alt=""/>
                                        <div className="media-body">
                                            <h5>Sharah St</h5>
                                            <img src={star} alt=""/>
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
        </>
    );
}

const mapState = (state) => ({
    user: state.user,
});

export default connect(mapState)(ProductDetail);
