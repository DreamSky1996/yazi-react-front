import React, { useState } from "react";

export default function SellerOrder({ order, openChat }) {
  const [showDetails, setShowDetails] = useState(false);

 
  return (
    <div
      className="order-history-list"
      onClick={() => setShowDetails(!showDetails)}
    >
      <div
        className="btn btn-block"
        data-toggle="collapse"
        data-target="#collapse-4"
        aria-expanded="false"
        aria-controls="collapse-4"
      >
        <div className="row">
          <div className="col-md-8 text-left">
            <div className="media">
              <div className="thumb align-self-center">
                <img src={`http://127.0.0.1:9090/${order.product.images[0]}`} className="img-crop" alt="" />
              </div>
              <div className="media-body">
                <h6>
                  {order.product.name}
                  <small className="ml-3">by {order.buyer.name}</small>
                </h6>
                <span className="price">{order.price}$</span>
                <span className="qty ml-4">Qty: {order.quantity}</span>
              </div>
            </div>
          </div>
          <div className="col-md-4 align-self-center">
            <ul>
              <li>
                <span className="badge badge-primary">{order.delivered}</span>
              </li>
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  openChat();
                }}
              >
                <img src="images/chat.png" alt="" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className={`collapse ${
          showDetails ? "show conditionalOpen" : "conditionalClose"
        }`}
        id="collapse-4"
      >
        <div className="card card-body">
          <div className="row">
            <div className="col-lg-8 col-xl-6 col-md-9">
              <div className="row">
                <div className="col-sm-4">
                  <h6>Shipping Address</h6>
                  <p>
                    Culver City,
                    <br />
                    CA 90232 <br />
                    United State
                  </p>
                </div>
                <div className="col-sm-4">
                  <h6>Shipping Method</h6>
                  <img src="images/s2.png" className="d-block mb-2" />
                  <p>+$10.00</p>
                </div>
                <div className="col-sm-4">
                  <h6>Payment Method</h6>
                  <img src="images/p2.png" className="d-block" />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-xl-3 col-md-3 ml-auto">
              <h6>Total Payment</h6>
              <p>{order.price}$</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
