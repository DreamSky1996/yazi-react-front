import React, {useState} from "react";
import {useHistory} from "react-router-dom"
import {Link} from "react-router-dom";

export default function OrderCard({order, openChat}) {
    const [showDetails, setShowDetails] = useState(false);
    const history = useHistory()

    const leaveFeedBack = () => {
        history.push({
            pathname: "/rate",
            state: {
                order: order

            }
        })
    };

    const onClick = (action) => {
        if (action === "Leave feedback") leaveFeedBack();
    };

    const checkDelivery = () => {
        let confirmation;
        const delivered = order.delivered.toLowerCase();
        if (delivered === "pending") confirmation = "Cancel";
        else if (delivered === "delivered") confirmation = "Confirm Delivery";
        else if (delivered === "completed") confirmation = "Leave feedback";
        else if (delivered === "done") confirmation = "Done";

        return confirmation;
    };

    let SD = order.delivered != 'pending' ? JSON.parse(order.shipping).Shipments.ProcessedShipment : null;
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
                                <img
                                    src={`http://127.0.0.1:9090/${order.product.images[0]}`}
                                    className="img-crop"
                                    alt=""
                                />
                            </div>
                            <div className="media-body">
                                <h6>
                                    {order.product.name}
                                    <small className="ml-3">by {order.seller.name}</small>
                                </h6>
                                <span className="price">{order.price}$</span>
                                <span className="qty ml-4">Qty: {order.quantity}</span>
                                {
                                    SD ? (
                                            <span className="ml-4 float-right">Track Order: <Link to={"/track/" + SD.ID} className="badge badge-sm btn-primary">{SD.ID}</Link></span>
                                    ) : (<></>)
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 align-self-center">
                        <ul>
                            <li>
                <span
                    onClick={(e) => onClick(e.currentTarget.textContent)}
                    className="badge badge-primary"
                >
                  {checkDelivery()}
                </span>
                            </li>
                            <li
                                onClick={(e) => {
                                    e.stopPropagation();
                                    openChat();
                                }}
                            >
                                <img src="images/chat.png" alt=""/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div
                className={`collapse $ {
          showDetails ? "show conditionalOpen" : "conditionalClose"
        }`}
                id="collapse-4"
            >
                <div className="card card-body">
                    <div className="row">
                        <div className="col-md-9 col-xl-6 col-md-9">
                            <table width="100%">
                                <tr>
                                    <th>Shipping Address</th>
                                    <th>Shipping Method</th>
                                    <th>Payment Method</th>
                                    <th>Tracking ID</th>
                                </tr>
                                <tr>
                                    <td>
                                        { SD ? SD.ShipmentDetails.Destination : "-"} <br/>
                                        {SD ? SD.ShipmentDetails.DestinationCity : ""}
                                    </td>
                                    <td>
                                        <img src="images/s2.png" className="d-block mb-2"/>
                                        <p>+$10.00</p>
                                    </td>
                                    <td>
                                        <img src="images/p2.png" className="d-block"/>
                                    </td>
                                    <td>{SD ? SD.ID : ""}</td>
                                </tr>
                            </table>
                        </div>
                        <div className="col-md-3 col-xl-3 col-md-3 ml-auto">
                            <h6>Total Payment</h6>
                            <p>{order.price}$</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
