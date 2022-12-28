import React from 'react';
import NavBar from './NavBar';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Footer from './Footer';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';

function Home(props) {
  const [active, setActive] = useState(props.auth);

  const auth = useSelector((state) => state.authCheck.active);
  const [isActive, setIsActive] = useState(auth);
  console.log('from home page 1', active);
  // setIsActive(auth);
  useEffect(() => {
    setIsActive(auth);
    console.log(isActive, ' from home effect ');
  }, []);
  return (
    <div>
      <NavBar auth={active} />
      {console.log('from home page ', active, auth)}
      <div className="HomePage">
        <header className="page-header">
          <div className="hero">
            <div className="sec1">
              <h1>Business Organization</h1>
              <p>
                Grow your investment portfolio with our diverse range of
                projects
              </p>
            </div>
            <div className="headerButtons">
              {auth ? (
                <Link to="/projects">
                  <button className="join-us"> View Projects</button>
                </Link>
              ) : (
                <Link to="/login">
                  <button className="join-us">Join us</button>
                </Link>
              )}

              <Link to="/about">
                <button className="learn-more">Learn more</button>
              </Link>
            </div>
          </div>
        </header>

        <section className="info-section">
          <h1>Brief Statistics</h1>
          <ul>
            <li>
              <div>2000+</div>
              <div>investors</div>
            </li>
            <li>
              <div>3000+</div>
              <div> Proprietors</div>
            </li>
            <li>
              <div>4000+</div>
              <div> Projects</div>
            </li>
            <li>
              <div>3000+</div>
              <div>Happy Clients</div>
            </li>
          </ul>
        </section>

        <section className="investor-section">
          <h1>Investor Opportunities</h1>
          <p>Learn about the projects available for investment:</p>
          <Link to="/about">
            <button className="learn-more-button">Learn More</button>
          </Link>
        </section>

        <section className="proprietor-section">
          <h1>Project Proprietors</h1>
          <p>Post your project and attract potential investors:</p>
          {auth ? (
            <Link to="/user/dashboard">
              <button className="post-project-button"> Post Project</button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="post-project-button"> Post Project</button>
            </Link>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
