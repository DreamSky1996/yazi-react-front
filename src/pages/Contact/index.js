import React, { useState, useRef } from "react";
import SimpleReactValidator from "simple-react-validator";
import { issueTicket } from "../../actions/user_actions";
export default function Contact(props) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const validator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState();

  const postTicket = (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      setLoading(true);
      issueTicket({ email, message, phone, name }).then((result) => {
        setLoading(false);

        clearFields();
      });
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  const clearFields = () => {
    setEmail("");
    setName("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-lg-11 clearfix">
            <div className="row">
              <div className="col-lg-5">
                <div className="map">
                  <div className="map-inner">
                    <iframe
                      style={{ border: 0 }}
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48363.38936933083!2d-73.98671186938435!3d40.746365916129626!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b30eac9f%3A0xaca05ca48ab5ac2c!2s350+5th+Ave%2C+New+York%2C+NY+10118%2C+USA!5e0!3m2!1sen!2smy!4v1430753807808"
                    ></iframe>
                  </div>
                </div>
              </div>

              <div className="col-lg-7 contact-form align-self-center">
                <h4>
                  <strong>Dear customer, after your message is sent</strong>
                  <br />
                  we will get back to you within 24 hours
                </h4>
                <form>
                  <div className="row">
                    <div className="col-sm-12 mt-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      {validator.current.message("name", name, "required", {
                        className: "text-danger",
                      })}
                    </div>
                    <div className="col-sm-6 mt-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {validator.current.message(
                        "email",
                        email,
                        "required|email",
                        {
                          className: "text-danger",
                        }
                      )}
                    </div>
                    <div className="col-sm-6 mt-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      {validator.current.message("phone", phone, "required", {
                        className: "text-danger",
                      })}
                    </div>
                    <div className="col-sm-12 mt-4">
                      <textarea
                        className="form-control"
                        placeholder="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                      {validator.current.message(
                        "message",
                        message,
                        "required",
                        {
                          className: "text-danger",
                        }
                      )}
                    </div>
                  </div>
                  <div className="mt-4 text-right">
                    <button
                      className="btn btn-primary"
                      onClick={postTicket}
                      style={{ width: "185px" }}
                    >
                      Send Message
                      <img
                        style={{ display: loading ? "inline" : "none" }}
                        className="loading"
                        src="./images/loading.gif"
                        alt=""
                      />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
