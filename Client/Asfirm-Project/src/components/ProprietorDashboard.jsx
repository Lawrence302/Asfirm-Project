import React, { useEffect, useState } from 'react';
import ProjectsTable from './ProjectsTable';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getUserProjects } from '../features/user/userInfoSlice';
import { useDispatch, useSelector } from 'react-redux';

import './styles/ProprietorDashboard.css';
import NavBar from './NavBar';
import Footer from './Footer';

function ProprietorDashboard(props) {
  const [errMessage, setErrMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem('info')).accessToken; // getting the token from storage
    const id = JSON.parse(localStorage.getItem('info')).id; // getting id from storage
    const API = `http://localhost:3000/${id}/signedIn`;

    axios
      .get(API, {
        headers: {
          'auth-token': `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        setErrMessage(null);
      })
      .catch((e) => {
        if (e) {
          if (e.response.data.error === 'Not Authenticated') {
            setErrMessage('Login To view Projects');
          }
        }
        console.log('error ccured ', e.response.data.error);
      });
  }, []);
  return (
    <div>
      {' '}
      <NavBar />
      <div className="userDashboard">
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
            <div className="sec1">
              <div>
                <h1> Dashboard </h1>
              </div>
              <div>
                {user ? (
                  user.type === 'investor' ? (
                    ''
                  ) : (
                    <Link to="/user/createPost">
                      <button className="new-project-btn">New Project</button>
                    </Link>
                  )
                ) : (
                  ''
                )}
              </div>
            </div>

            <div>
              <ProjectsTable />
            </div>
          </div>
        )}
      </div>
      {errMessage ? '' : <Footer />}
    </div>
  );
}

export default ProprietorDashboard;
