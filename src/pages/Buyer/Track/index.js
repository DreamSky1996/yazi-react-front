import React, {useEffect, useState} from "react";
import "./track.css";
import Loader from "../../../components/util/loader";
import Sidebar from "../../../components/Header_Footer/Sidebar/index"
import InfiniteScroll from "react-infinite-scroller";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {
    getTrackProduct
} from "../../../actions/products_actions";

function Shop(props) {
    const [track, setTrack] = useState(props.match.params.id);
    const [trackResult, setTrackResult] = useState([]);

    useEffect(() => {
        getTrackProduct(props.match.params.id).then(res => {
            if (!res.record.HasErrors) {
                // console.log(WaybillNumber)
                setTrackResult(res.record.TrackingResults.KeyValueOfstringArrayOfTrackingResultmFAkxlpY.Value.TrackingResult)
            }
        });
    }, []);

    return (
        <div className="page-wrapper">
            <Sidebar/>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-xl-6 clearfix feedback-content">
                        <div className="mb-4">
                            <h4>
                                <center>Order Track Record for #{trackResult.WaybillNumber}</center>
                            </h4>
                        </div>
                        <div className="media">
                            <span className="media-body">
                                <p>
                                    <table  width="100%" border="1" cellPadding="2">
                                        <tr><th><small>UpdateCode:</small></th> <td><small>{trackResult.UpdateCode}</small></td></tr>
                                        <tr><th><small>UpdateDescription:</small></th> <td><small>{trackResult.UpdateDescription}</small></td></tr>
                                        <tr><th><small>UpdateDateTime:</small></th> <td><small>{trackResult.UpdateDateTime}</small></td></tr>
                                        <tr><th><small>UpdateLocation:</small></th> <td><small>{trackResult.UpdateLocation}</small></td></tr>
                                        <tr><th><small>GrossWeight:</small></th> <td><small>{trackResult.GrossWeight}</small></td></tr>
                                        <tr><th><small>ChargeableWeight:</small></th> <td><small>{trackResult.ChargeableWeight}</small></td></tr>
                                        <tr><th><small>WeightUnit:</small></th> <td><small>{trackResult.WeightUnit}</small></td></tr>
                                    </table>
                                </p>
                            </span>
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

export default connect(mapState)(Shop);
