import React, { useInsertionEffect, useState } from 'react';
import axios from 'axios';
import './styles/EditUserInfo.css';
import NavBar from './NavBar';
import DeleteAccount from './DeleteAccount';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// getting the token from storage
const id = JSON.parse(localStorage.info).id; // getting id from storage
const API = `http://localhost:3000/${id}/userInfo`; // to update info

function EditUserInfo() {
  const [errMessage, setErrMessage] = useState(null);
  const [newInfo, setNewInfo] = useState(null);
  const [info, setInfo] = useState(null);
  const userInfo = useSelector((state) => {
    state.userData.data;
  });

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    country: '',
    email: '',
  });

  // const if1 = () => {
  //   if (!user.firstName) {
  //     setUser({ ...user, firstName: info.firstName });
  //   }
  // };

  const saveChanges = (e) => {
    e.preventDefault();
    const accessToken2 = JSON.parse(localStorage.info).accessToken;
    axios
      .patch(
        API,
        { user },
        {
          headers: {
            'auth-token': `Bearer ${accessToken2}`,
          },
        }
      )
      .then((res) => {
        console.log('edited success ', res.data);
        setNewInfo(res.data);
        setInfo(res.data);
        console.log('new Info  state ', newInfo);
      })
      .catch((e) => {
        console.log(e.response);
      });

    console.log(user);
  };

  // const getInfo = () => {

  //   console.log(user);
  // };

  useEffect(() => {
    console.log('user effect ran');
    //getting the token for local storage
    const accessToken = JSON.parse(localStorage.getItem('info')).accessToken;
    const API2 = `http://localhost:3000/${id}/userData`; //to get info
    axios
      .get(API2, {
        headers: {
          'auth-token': `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log('user info gotten ', res.data);
        setInfo(res.data);
      })
      .catch((e) => {
        if (e) {
          setErrMessage(e.response.data.error);
        }
        console.log(e.response);
      });
  }, []);

  const checkField = (e, name) => {
    e.preventDefault();
    e.target.placeholder = info.name;
    console.log(true);
  };

  return (
    <div>
      <NavBar />
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
          <div className="editUserInfoPage">
            <form className="editForm">
              <label>First Name :</label>
              <input
                type="text"
                placeholder={info ? info.firstName : 'First Name'}
                value={user.firstName}
                onFocus={(e) => focus(e)}
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
              />
              <br />
              <label>Last Name : </label>
              <input
                type="text"
                placeholder={info ? info.lastName : 'Last Name'}
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
              <br />
              <label>Country : </label>
              <input
                type="text"
                placeholder={info ? info.country : 'Country'}
                value={user.country}
                onChange={(e) => setUser({ ...user, country: e.target.value })}
              />
              <br />
              <label>Email : </label>
              <input
                type="email"
                placeholder={info ? info.email : 'Email'}
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <br />
              <button className="Save-change-btn" onClick={saveChanges}>
                <Link to="/user/profile">Save Changes</Link>
              </button>
            </form>
          </div>
          {/* to delete user account  */}
          {/* <div className="DeleteAcc-sec">
            <div className="DeleteAcc-comp">
              <DeleteAccount />
            </div>
            <button>Delete Account</button>
          </div> */}
        </div>
      )}
    </div>
  );
}

export default EditUserInfo;
