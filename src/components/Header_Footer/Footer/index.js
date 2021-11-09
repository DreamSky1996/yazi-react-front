import React from "react";
import "./footer.css";
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <ul className="menu">
          <li>
            <Link to="#">Linkbout Us</Link>
          </li>
          <li>
            <Link to="#">Return</Link>
          </li>
          <li>
            <Link to="#">Order Tracker</Link>
          </li>
          <li>
            <Link to="#">Customer Reviews</Link>
          </li>
        </ul>
        <ul>
          <li>&copy;2021</li>
          <li>
            <Link to="#">Privacy Policy</Link>
          </li>
          <li>
            <Link to="#">Terms & Conditions</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
