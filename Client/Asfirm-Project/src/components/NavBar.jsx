import React from 'react';
import { Link } from 'react-router-dom';
import './styles/NavBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import MenuIcon from '@mui/icons-material/Menu';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   solid,
//   regular,
//   brands,
//   icon,
// } from '@fortawesome/fontawesome-svg-core/import.macro';
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FaBars } from 'react-icons/fa';

import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { authStatus, getUserData } from '../features/user/authenticatedSlice';

//nav bar
function NavBar(props) {
  ////////////////////

  const [smScreen, setSmScreen] = useState(null);
  const [show, setShow] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [showpfDrop, setShowpfDrop] = useState(false);
  const auth = useSelector((state) => {
    state.authCheck.active;
  });
  const navigate = useNavigate();

  const [userActive, setUserActive] = useState(false);

  const dispatch = useDispatch();

  const toggleProfileDrop = () => {
    setShowpfDrop(!showpfDrop);
    setShow(false);
  };

  const loginbtn = (
    <Link to="/login">
      <button className={userActive ? 'hide' : 'login-btn'}>Login</button>
    </Link>
  );

  const profileCircle = (
    <div
      // className={width < 800 ? 'hide' : 'profileCircle'}
      className={width < 800 ? 'profileCircle' : 'profileCircle'}
      onClick={toggleProfileDrop}
    >
      {' '}
      GK{' '}
    </div>
  );

  const toggleMenu = () => {
    setShow(!show);
  };

  const signOut = () => {
    const accessToken = JSON.parse(localStorage.getItem('info')).accessToken; // getting the token from storage
    const id = JSON.parse(localStorage.getItem('info')).id; // getting id from storage
    const API = `http://localhost:3000/${id}/logout`;
    axios
      .get(API, {
        headers: {
          'auth-token': `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        // console.log('logged out  status ', res.data);
        localStorage.clear();
        localStorage.setItem(
          'info',
          JSON.stringify({ accessToken: 'tone', id: '34' })
        );
        setUserActive(false);
        dispatch(authStatus(false));
        navigate('/login');
        // return res.data;
      })
      .catch((e) => {
        // console.log('from app body', e, { auth: false });
        // navigate('/login');
        setUserActive(false);
      });
  };

  const profileDropDown = (
    <div
      // className={width < 800 ? 'hide ' : userActive ? 'userDropdown' : 'hide'}
      className={userActive ? 'userDropdown' : 'hide'}
    >
      <ul>
        <li>
          <Link to="/user/profile">Profile</Link>
        </li>
        <li>
          {' '}
          <Link to="/user/dashboard">My projects</Link>
        </li>

        <li>
          <Link to="">Notifications</Link>
        </li>

        <li onClick={signOut}>
          <Link to="/login">Log out</Link>
        </li>
      </ul>
    </div>
  );

  // const loggoutbtn = (
  //   <button onClick={signOut}>
  //     {' '}
  //     <Link to="/login">Logout</Link>
  //   </button>
  // );

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      // setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // return () => {
    //   window.removeEventListener('resize', handleResize);
    // };

    const accessToken = JSON.parse(localStorage.getItem('info')).accessToken; // getting the token from storage
    const id = JSON.parse(localStorage.getItem('info')).id; // getting id from storage
    const API = `${import.meta.env.VITE_LINK_URL}/${id}/signedIn`;
    const response = axios
      .get(API, {
        headers: {
          'auth-token': `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        // console.log('cheAuth fro app body ', res.data, { auth: true });
        console.log({ auth: true });
        setUserActive({ active: true, data: res.data });
        dispatch(authStatus(true));
        dispatch(getUserData(res.data));
        return res.data;
      })
      .catch((e) => {
        // console.log('from app body', e, { auth: false });
        console.log({ auth: false });

        // navigate('/login');
        setUserActive(false);
      });
    // return response.data;
  }, [auth]);

  return (
    <div>
      <nav className="NavBar">
        {/* <MenuIcon className="" /> */}
        {/* <FontAwesomeIcon icon="fa fa-bars" /> */}
        {/* {console.log(width)} */}
        {/* <FaBars
          // className={userActive ? 'menuIcon' : 'hide'}
          className="menuIcon"
          onClick={toggleMenu}
        /> */}
        <div className="NavBarN">
          <div className="menuIcon-box">
            <FaBars
              onMouseOver={(e) => setShow(true)}
              // className={userActive ? 'menuIcon' : 'hide'}
              className="menuIcon"
              onClick={toggleMenu}
            />
          </div>
          <div className="sec1">
            {/* <h2>B Logo</h2> */}
            <div className="logo-box">
              <img className="logo" src="../../logo.png" />
            </div>
          </div>
          {/* <div className=" sec2 sec2Sm" > */}
          <div className={width < 800 ? (show ? 'sec2Sm' : 'hide') : 'sec2'}>
            {/* <ul className=" navul navulSm"> */}
            <ul
              onMouseLeave={(e) => setShow(false)}
              className={
                width < 800 ? (userActive ? 'navulSm' : 'hide') : 'navul'
              }
            >
              <Link to="/">
                <li>Home</li>
              </Link>

              <Link to="/services">
                <li>Services</li>
              </Link>

              <Link to="/projects">
                <li>Projects</li>
              </Link>

              <Link to="/about">
                <li>About us</li>
              </Link>

              <Link to="/contact">
                <li>Contact</li>
              </Link>

              <Link to="/pricing">
                <li>Pricing</li>
              </Link>
            </ul>
          </div>
          <div className="sec3">
            {/* {userActive ? loggoutbtn : loginbtn} */}
            {userActive ? profileCircle : loginbtn}
            {showpfDrop ? profileDropDown : null}
          </div>
          {/* <div className="menuIcon-box">
            <FaBars
              // className={userActive ? 'menuIcon' : 'hide'}
              className="menuIcon"
              onClick={toggleMenu}
            />
          </div> */}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
