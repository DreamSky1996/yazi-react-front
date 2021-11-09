import React, { useState, useRef, useEffect } from "react";
import "./rating.css";
import { connect } from "react-redux";
import { postReview } from "../../actions/user_actions";
import SimpleReactValidator from "simple-react-validator";

let order;
const Rating = (props) => {
  const [review, setReview] = useState("");
  const [starRate, setStarRate] = useState(1);
  const validator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState();
  const [loading, setLoading] = useState(false);
  const [msg,setMsg]=useState("")

  const submitReview = (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      setLoading(true);
      validator.current.hideMessages();
      const data = {
        review: review,
        starRate: starRate,
        order: order,
      };
      postReview(data).then((result) => {
        setLoading(false);
        setMsg("Review added successfully")
        
      });
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  useEffect(() => {
    order = props.location.state["order"];
  }, []);

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6 clearfix feedback-content">
            <div className="mb-4">
              <h4>Lorem ipsum dolor sit amet, nec eu zril fierent.</h4>
              <p>
                Primis vivendum euripidis ea pri. Case moderatius mei ut, has
                congue detracto luptatum an
              </p>
            </div>
            <div className="media">
              <img src="images/user.svg" alt="" />
              <span className="media-body">{props.user.name}</span>
            </div>
            <form>
              <div className="row">
                <div className="mb-4 col-sm-12">
                  <div className="stars rating" data-rating="3">
                    <span
                      onClick={() => setStarRate(1)}
                      className={`star ${starRate > 0 && "rated"}`}
                    >
                      &nbsp;
                    </span>
                    <span
                      onClick={() => setStarRate(2)}
                      className={`star ${starRate > 1 && "rated"}`}
                    >
                      &nbsp;
                    </span>
                    <span
                      onClick={() => setStarRate(3)}
                      className={`star ${starRate > 2 && "rated"}`}
                    >
                      &nbsp;
                    </span>
                    <span
                      onClick={() => setStarRate(4)}
                      className={`star ${starRate > 3 && "rated"}`}
                    >
                      &nbsp;
                    </span>
                    <span
                      onClick={() => setStarRate(5)}
                      className={`star ${starRate > 4 && "rated"}`}
                    >
                      &nbsp;
                    </span>
                  </div>
                </div>
                <div className="mb-4 col-sm-12">
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="form-control"
                  ></textarea>
                  {validator.current.message("Review", review, "required", {
                    className: "text-danger",
                  })}
                </div>
                <div className="mb-4 col-sm-6 align-self-center">
                  <button
                    onClick={submitReview}
                    className="btn btn-primary btn-block"
                  >
                    Submit
                    <img
                      style={{ display: loading ? "inline" : "none" }}
                      className="loading"
                      src="./images/loading.gif"
                      alt=""
                    />
                  </button>
                  <div className="confirm-msg">{msg}</div>

                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapState)(Rating);
