import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import load from "../../util/images/loading.gif";
import {
    getCartTotal,
    postToCart,
    subscribe,
} from "../../actions/user_actions";

const ProductCard = (props) => {
    const [actionLoading, setActionLoading] = useState(false);
    const {product} = props;
    const {usertype, username} = props;
    const history = useHistory();

    const navigateToSellerProfile = () => {
        if (usertype === "buyer" || usertype === "user")
            history.push(`/seller-profile/${product.creator._id}`)
        else if (usertype === "seller")
            history.push(`/seller-profile/${props.sellerId}`)
    }

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
        if (!props.userLoggedIn) {
            template = (
                <>
                    <li className="social">
                        <Link to="/login">
                            <button className="add btn btn-primary">
                                {actionLoading ? (<img className="loading" src={load} alt=""/>) : ("Add to Bag")}
                            </button>
                        </Link>
                    </li>
                </>
            );
        } else {
            template = (
                <>
                    <button onClick={() => {
                        addToCart(product._id);
                    }} className="add btn btn-primary">
                        {actionLoading ? (<img className="loading" src={load} alt=""/>) : ("Add to Bag")}
                    </button>
                </>
            );
        }
        return template;
    }


    return (
        <div className="col-md-6 col-lg-4 mt-4">
            <div className="content">
                <div className="inner-content coleql_height">
                    <small style={{cursor: "pointer"}} onClick={navigateToSellerProfile} className="d-block mb-2">
                        By{" "}
                        {usertype === "buyer" || usertype === "user"
                            ? product.creator.name
                            : username}
                    </small>
                    <div className="embed-responsive embed-responsive-1by1">
                        <Link to={`/product/${product._id}`}>
                            <div className="full-img">
                                <img
                                    src="https://i.pinimg.com/originals/d7/be/2a/d7be2a0cc36277ba0d5fcb3b325389a5.jpg"
                                    // src={`http://127.0.0.1:9090/${product.images[0]}`}
                                    alt=""/>
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
};

export default ProductCard;
