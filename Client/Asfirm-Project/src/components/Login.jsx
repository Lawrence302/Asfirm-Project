import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/user/loginSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { authStatus } from '../features/user/authenticatedSlice';

import ProprietorDashboard from './ProprietorDashboard';

// mui
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import './styles/Login.css';

function Login() {
  const navigate = useNavigate();
  // const [userActive, setUserActive] = useState(false);
  const userInfo = useSelector((state) => state.login.data);

  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const submitForm = (e) => {
    e.preventDefault();
    // console.log(user);
    dispatch(loginUser(user));
    setUser({ ...user, email: '' });
    setUser({ ...user, password: '' });
  };

  const loggedIn = (value) => {
    if (value.accessToken) {
      dispatch(authStatus(true));
      navigate('/');
      // window.location.reload();
      return;
    } else {
      return 'Login';
    }
  };

  useEffect(() => {
    if (!userInfo) {
      return;
    }
    // console.log(' this is from state returned ', userInfo);

    loggedIn(userInfo);

    // console.log(' this is to see if user is active : ', userActive);
  }, [userInfo]);

  return (
    <div className="login ">
      <form className="login-form" action="post">
        <h1>Login </h1>
        <div>
          <TextField
            label="email"
            type="email"
            inputProps={{ style: { fontSize: '15px' } }} // font size of input text
            InputLabelProps={{ style: { fontSize: '15px' } }} // font size of input label
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <br /> <br />
          <TextField
            label="password"
            variant="outlined"
            inputProps={{ style: { fontSize: '15px' } }} // font size of input text
            InputLabelProps={{ style: { fontSize: '15px' } }} // font size of input label
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <Button
          sx={{ mt: 2, width: '90%', p: 1 }}
          variant="contained"
          type="submit"
          onClick={(e) => submitForm(e)}
        >
          Login
        </Button>

        <p>
          Don't have an account?{' '}
          <span>
            <Link to="/register">register here</Link>
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
