import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../features/user/registerSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './styles/Register.css';
import Button from '@mui/material/Button';

function Register() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    confirmPassword: '',
    country: '',
    userType: '',
  });
  const userInfo = useSelector((state) => state.register.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState('');
  const [errMessage, setErrMessage] = useState(null);
  const [match, setMatched] = useState(true);

  const checkedType = (e) => {
    if (e.target.checked) {
      setUser({ ...user, userType: e.target.value });
    }
  };

  const passConfirmed = () => {
    // setUser({ ...user, confirmPassword: e.target.value });
    if (user.password !== user.confirmPassword) {
      setMatched(false);
      return false;
    }

    if (user.password === user.confirmPassword) {
      setMatched(true);
      return true;
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (
      !user.firstName ||
      !user.country ||
      !user.password ||
      !user.confirmPassword ||
      !user.userType ||
      !user.email
    ) {
      setErrMessage('Please fill the neccessary fields');
      return;
    }

    passConfirmed();

    if (!passConfirmed) {
      setMatched(false);
      return;
    }

    if (userInfo) {
      setSuccessMessage(userInfo.success);
      // console.log('ther was success ', userInfo.success);
    }

    setErrMessage(null);

    setUser({
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      confirmPassword: '',
      country: '',
      userType: '',
    });

    // console.log('befor send ', user);
    dispatch(registerUser(user));
    // console.log('after receiving', userInfo);
    setTimeout(function () {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="RegisterPage">
      <div>{successMessage}</div>
      <form className="Register_form">
        <div>
          <h2>Register</h2>
        </div>
        <div>
          <div className="input_group ">
            <div className="input_box">
              <label>First Name</label> <br />
              <input
                className="inputT"
                type="text"
                placeholder="Enter First Name"
                required={true}
                value={user.firstName}
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
              />
            </div>
            <div className="input_box">
              <label>Last Name</label>
              <br />
              <input
                className="inputT"
                type="text"
                value={user.lastName}
                placeholder="Enter Last Name"
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </div>
          </div>

          <div className="input_group ">
            <div className="input_box">
              <label>Password</label>
              <br />
              <input
                className="inputT"
                type="password"
                placeholder="Enter password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <div className="input_box">
              <label>Confirm Password</label>
              <br />
              <input
                className="inputT"
                type="password"
                placeholder="confirmPassword"
                value={user.confirmPassword}
                onBlur={passConfirmed}
                onChange={(e) =>
                  setUser({ ...user, confirmPassword: e.target.value })
                }
              />
            </div>
          </div>
          {match ? '' : <div>Password Does not match</div>}
          <div className="input_group ">
            <div className="input_box">
              <label>Email</label> <br />
              <input
                className="inputT"
                type="email"
                placeholder="Enter email e.g name@gmail.com"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>

            <div className="input_box">
              <label>Country</label> <br />
              <input
                className="inputT"
                type="text"
                placeholder="Enter Country Name"
                value={user.country}
                onChange={(e) => setUser({ ...user, country: e.target.value })}
              />
            </div>
          </div>
          <div className="userTypesBox">
            <label>User Type : </label> <br />
            <input
              className="radio"
              type="radio"
              name="userType"
              value="proprietor"
              onChange={(e) => checkedType(e)}
            />
            <label htmlFor="proprietor"> Proprietor </label>
            <input
              className="radio"
              type="radio"
              name="userType"
              value="investor"
              onChange={(e) => checkedType(e)}
            />
            <label htmlFor="investor"> Investor </label>
          </div>
        </div>
        {errMessage ? <div>{errMessage}</div> : ''}
        <div className="btnBox">
          <button
            className="submitButton"
            type="submit"
            onClick={(e) => submitForm(e)}
          >
            Register
          </button>
        </div>

        <div>
          <p>
            Already registered?{' '}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
