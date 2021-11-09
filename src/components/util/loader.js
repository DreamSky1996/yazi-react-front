import React from "react";
import "./loader.css";
import ReactLoading from "react-loading";

export default function Loader(props) {
  return (
    <div className="loader">
      <ReactLoading type="spin" color="#080f49" />
    </div>
  );
}
