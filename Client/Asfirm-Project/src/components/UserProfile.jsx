import React, { useEffect, useState } from 'react';
import { userType } from '../publicMethods/methods';
import { getUserInfo } from '../features/user/userInfoSlice';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './styles/UserProfile.css';
import NavBar from './NavBar';
import Footer from './Footer';

const accessToken = JSON.parse(localStorage.info).accessToken; // getting the token from storage
const id = JSON.parse(localStorage.info).id; // getting id from storage

function UserProfile() {
  const [errMessage, setErrMessage] = useState(null);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(null);
  const infoStore = useSelector((state) => {
    state.userData.data;
  });
  const infoStore2 = useSelector((state) => {
    state.authCheck.userData;
  });

  const myprojects = (
    <div>
      user projects <div>project 1</div>
    </div>
  );

  const infoBody = (
    <div>
      <div className="pinfo">
        <div className="pinfo1">
          <div className="iconDiv">
            <h1>
              {userInfo
                ? `${userInfo.firstName.charAt(0)}${userInfo.lastName.charAt(
                    0
                  )}`
                : 'I'}
            </h1>
          </div>
          <div>
            <h2>
              {userInfo
                ? `${userInfo.firstName} ${userInfo.lastName}`
                : 'user Name'}
            </h2>
          </div>
        </div>
        <button>
          {' '}
          <Link to="/user/editInfo">Edit profile</Link>
        </button>
      </div>
      <div>
        <p>
          {' '}
          <b>UserType</b> : {userInfo ? userInfo.userType : 'user Type'}
        </p>
        <p>
          <b>Country: </b>
          {userInfo ? userInfo.country : ''}
        </p>
        <p>
          <b>Email: </b>
          {userInfo ? userInfo.email : ''}
        </p>
        <p>
          {' '}
          <b>Projects : </b> {userInfo ? userInfo.projects.length : ''}
        </p>
      </div>

      {/* incase of propritor */}
    </div>
  );

  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem('info')).accessToken;
    const id2 = JSON.parse(localStorage.getItem('info')).id;

    const API2 = `${import.meta.env.VITE_LINK_URL}/${id2}/userData`;
    // console.log('the id used ', id);
    // const data = await axios
    axios
      .get(API2, {
        headers: {
          'auth-token': `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        // console.log('done here in function call method2', res.data);
        setUserInfo(res.data);
        // return res.data;
      })
      .catch((e) => {
        if (e) {
          setErrMessage(e.response.data.error);
        }
        // console.log(e.response);
      });

    // console.log('returned from rest n ', n);
  }, []);

  return (
    <div>
      <NavBar />
      {console.log(errMessage)}
      {errMessage ? (
        <div className="errMessage-Background">
          <div className="errMessage-box">
            {' '}
            <h3 className="errMessage">{errMessage}</h3> <br />
            <Link to="/login">
              <button className="login-btn">Login</button>{' '}
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <h1>Public Profile profile </h1>
          <div>{userInfo ? infoBody : null}</div>

          <Footer />
        </div>
      )}
    </div>
  );
}

export default UserProfile;
