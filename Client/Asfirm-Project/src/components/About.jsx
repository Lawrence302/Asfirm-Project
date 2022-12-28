import React from 'react';
import Footer from './Footer';
import NavBar from './NavBar';

// importing css
import './styles/About.css';

function About() {
  return (
    <div>
      <NavBar />
      <div className="about-page">
        <h1>About Us - Company Name</h1>
        <p>
          [Company Name] is a business company that aims to bring proprietors
          and investors together in one place. Our goal is to make it easy for
          investors to find projects to invest in, and for proprietors to find
          investors to fund their project.
        </p>
        <h2>Our Services</h2>
        <p>
          Our services include:
          <ul>
            <li>
              - A platform for proprietors to showcase their projects and find
              investors
            </li>
            <li>
              - Tools and resources for investors to evaluate and invest in
              projects
            </li>
            <li>
              - Expert support and guidance for both proprietors and investors
            </li>
          </ul>
        </p>
        <h2>Our Team</h2>
        <p>
          [Company Name] was founded by [Founder Names]. Our team is comprised
          of experienced professionals who are dedicated to helping proprietors
          and investors succeed.
        </p>
        <h2>Notable Accomplishments</h2>
        <p>
          [Company Name] has helped [2000+] proprietors secure funding for their
          projects, and has assisted [3000+] investors in finding profitable
          investment opportunities.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default About;
