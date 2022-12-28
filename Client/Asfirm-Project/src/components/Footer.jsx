import React from 'react';
import { Link } from 'react-router-dom';
import '../components/styles/Footer.css';

function Footer() {
  return (
    <div className="Footer">
      <ul>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
        <li>
          <Link to="/help">Help and Support</Link>
        </li>
      </ul>
      <p> &#169; 2022 Asfirm All rights reserved </p>
    </div>
  );
}

export default Footer;
