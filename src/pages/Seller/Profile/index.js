import React, { useEffect, useState } from "react";
import star from "../../../util/images/star.png";
import p1 from "../../../util/images/p1.png";
import p2 from "../../../util/images/p2.png";
import s1 from "../../../util/images/s1.png";
import s2 from "../../../util/images/s2.png";
import user from "../../../util/images/user.svg";
import { getSeller } from "../../../actions/user_actions";
import Loader from "../../../components/util/loader";
export default function SellerProfile(props) {
  const [seller, setSeller] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const sellerId = props.match.params.id;
    getSeller(sellerId).then((user) => {
      setSeller(user);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ minHeight: "349px" }} className="page-wrapper">
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-xl-11">
              <div className="media pp-lg">
                <img src={user} className="user" alt="" />
                <div className="media-body">
                  <div className="mb-3">
                    <h5>{seller.name}</h5>
                    <div className="rating">
                      <img src={star} alt="" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <p>
                      Lorem ipsum dolor sit amet, eu vix facer movet dolorum.
                      His id doming scripta. Eu his harum putent dictas. In
                      aperiam veritus per. Ut per dicat electram, imperdiet
                      intellegam dissentiunt est an. Feugiat corpora phaedrum
                      sed ad. Ei eum novum impetus, quo choro probatus ex, te
                      vel cibo docendi corpora.
                    </p>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <p>Payment Method</p>
                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <img src={p1} alt="" />
                        </li>
                        <li className="list-inline-item">
                          <img src={p2} alt="" />
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <p>Shipping Method</p>
                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <img src={s1} alt="" />
                        </li>
                        <li className="list-inline-item">
                          <img src={s2} alt="" />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="reviews">
                <div className="row">
                  <div className="col-md-4 mt-4">
                    <div className="review-content coleql_height">
                      <div className="media mb-4">
                        <img src={user} alt="" className="user mr-2" />
                        <div className="media-body">
                          <h5>Sharah St</h5>
                          <img src={star} alt="" />
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
                        <img src={user} className="user mr-2" alt="" />
                        <div className="media-body">
                          <h5>Sharah St</h5>
                          <img src={star} alt="" />
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
                        <img src={user} className="user mr-2" alt="" />
                        <div className="media-body">
                          <h5>Sharah St</h5>
                          <img src={star} alt="" />
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
      )}
    </div>
  );
}
