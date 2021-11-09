import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./userDashboard.css";

import { openModal, closeModal } from "../../actions/modalActions";
import SelectFilterDropDown from "../../components/util/selectFilterDropDown";
import OrderCard from "../../components/Order";
import SellerOrderCard from "../../components/Order/sellerOrder";
import { getCart, getSellerCart } from "../../actions/user_actions";
import Loader from "../../components/util/loader";

import { Link } from "react-router-dom";
const UserDashboard = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const closeMenu = () => {
    openMenu && setOpenMenu(false);
  };

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [delivered, setDelivered] = useState("all");

  const filters = [
    { title: "ALL", value: "all" },
    { title: "Pending", value: "pending" },
    { title: "Done", value: "done" },
    { title: "Delivered", value: "delivered" },
    { title: "Completed", value: "completed" },
  ];

  useEffect(() => {
    if (props.user.type === "buyer") getUserCart(delivered);
    else if (props.user.type === "seller") {
      getSellerCartOrders(delivered);
    }
  }, []);

  const getSellerCartOrders = (delivered) => {
    setLoading(true);
    getSellerCart(delivered)
      .then((data) => {
        setCart(data.orders);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const getUserCart = (delivered) => {
    setLoading(true);
    getCart(delivered)
      .then((data) => {
        setCart(data.orders);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const onChangeFilters = (selectedValue) => {
    setDelivered(selectedValue);
    if (props.user.type === "buyer") getUserCart(selectedValue);
    else if(props.user.type === "seller") getSellerCartOrders(selectedValue)
  };

  const init = () => {
    if (props.currentModel && props.currentModel.modalType === "Chat")
      props.closeModal();

    if (openMenu) closeMenu();
  };

  return (
    <div
      className="page-wrapper"
      onClick={() => {
        closeMenu();
      }}
    >
      <div className="container" onClick={init}>
        <div className="seller-info row">
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="media">
              <div className="user">
                <div className="flag">
                  <img src="images/flag.png" alt="" />
                </div>
                <div className="user-img">
                  <img src="images/user.svg" alt="" />
                </div>
              </div>
              <div className="media-body">
                <ul>
                  <li>
                    <h4>{props.user.name}</h4>
                  </li>
                  <li>{props.user.email}</li>
                  <li>
                    <small>last login time 2021-03-03</small>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4 align-self-center">
            <ul>
              <li>
                <Link to="" className="btn btn-primary">
                  Change Password
                </Link>
              </li>
              {
                props.user.type === "seller" ?
              <li>
                <Link to="/shop" className="btn btn-primary">
                  My Products
                </Link>
              </li>

              :
              props.user.type === "buyer" &&
              <li>
                <Link to="/checkout" className="btn btn-primary">
                  Go to your cart
                </Link>
              </li>
              }
            </ul>
          </div>
        </div>

        <div className="order-history">
          <div className="mb-4 clearfix">
            <h3 className="float-left mb-4">Order History</h3>
            <div className="dropdown float-left ml-4">
              <SelectFilterDropDown
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                options={filters}
                title="FILTERS"
                width="130px"
                init="all"
                onChange={(selectedValue) => onChangeFilters(selectedValue)}
                closeMenu={() => setOpenMenu(false)}
              />
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : loading === false && cart && cart.length > 0 ? (
            props.user.type === "buyer" ? (
              cart.map((order,i) => {
                return (
                    <OrderCard
                        openChat={() => props.openModal("Chat",{buyerId:order.buyerId,sellerId:order.sellerId,username:props.user.name,useremail:props.user.email})}
                        key={order.product.size+i+order.productId}
                        order={order}
                    />
                );
              })
            ) : (
              cart.map((order,i) => {
                return (
                  <SellerOrderCard
                    openChat={() => props.openModal("Chat",{buyerId:order.buyerId,sellerId:order.sellerId,username:props.user.name,useremail:props.user.email})}
                    key={order.product.size+i+order.productId}
                    order={order}
                  />
                );
              })
            )
          ) : (
            <div className="no-products-found">No Orders Found</div>
          )}
        </div>
      </div>
    </div>
  );
};

const actions = {
  openModal,
  closeModal,
};
const mapState = (state) => ({
  user: state.user,
  currentModel: state.modals,
});

export default connect(mapState, actions)(UserDashboard);
