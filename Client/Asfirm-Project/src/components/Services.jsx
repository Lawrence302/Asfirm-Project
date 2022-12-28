import React from 'react';
import { useState } from 'react';
import Footer from './Footer';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import './styles/Services.css';

function Services(props) {
  const [isActive, setIsActive] = useState(props.auth);
  return (
    <div>
      <NavBar />
      <div className="services-page">
        <h1>Our Services - [Company Name]</h1>

        <p>
          At [Company Name], we offer a range of services to help proprietors
          and investors succeed. Our services include:
        </p>
        <h2>Platform for Proprietors</h2>
        <p>
          Our platform allows proprietors to showcase their projects to
          potential investors. This includes the ability to create a profile for
          their project, upload detailed information and documents, and connect
          with investors who are interested in funding their project.
        </p>
        <h2>Tools and Resources for Investors</h2>
        <p>
          We provide investors with the tools and resources they need to
          evaluate and invest in projects. This includes access to project
          profiles, financial data and projections, and expert support from our
          team.
        </p>
        <h2>Expert Support and Guidance</h2>
        <p>
          Our team of experienced professionals is dedicated to providing expert
          support and guidance to both proprietors and investors. This includes
          personalized advice and assistance with finding and evaluating
          investment opportunities.
        </p>
        <h2>Additional Services</h2>
        <p>
          In addition to the services listed above, [Company Name] also offers
          the following:
          <ul>
            <li>
              - Matchmaking services to help proprietors and investors find each
              other
            </li>
            <li>
              - Educational resources and workshops to help proprietors and
              investors learn more about the investment process
            </li>
            <li>
              - Consulting services to help proprietors and investors navigate
              the legal and regulatory aspects of investing and fundraising
            </li>
          </ul>
        </p>
        <Link to="/">
          <div className="callToActoion">
            <button className="join-btn">Join us And Get Started</button>
          </div>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Services;
