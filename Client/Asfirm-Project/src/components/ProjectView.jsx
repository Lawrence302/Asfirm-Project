import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import NavBar from './NavBar';

import './styles/ProjectView.css';

function ProjectView(props) {
  const [projInfo, setProjInfo] = useState(null);
  const [projOfInterest, setProjOfInterest] = useState(null);
  const [errMessage, setErrMessage] = useState(null);
  const [restricted, setRestricted] = useState(null);

  const [inError, setInError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isInterested, setisInterested] = useState(false);

  const showInterest = () => {
    const accessToken = JSON.parse(localStorage.getItem('info')).accessToken;
    const uid = JSON.parse(localStorage.getItem('info')).id;
    const pid = JSON.parse(localStorage.getItem('projectId')).id;
    const IAPI = `http://localhost:3000/${pid}/${uid}/interest`;
    console.log('clicked interest', { interest: 'me' });

    axios
      .patch(IAPI, {
        headers: {
          'auth-token': `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log('interst response ', res.data);
        setisInterested(true);
      })
      .catch((e) => {
        if (e) {
          setInError(e.response.data.error);
        }
        console.log(e);
      });
  };

  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem('info')).accessToken;
    const pid = JSON.parse(localStorage.getItem('projectId')).id; // project id from local storage
    let id = true;
    if (localStorage.getItem('userId') == null) {
      id = false;
      setErrMessage('no user found');
    }

    if (id) {
      const uid = JSON.parse(localStorage.getItem('userId')).id;
      const API = `http://localhost:3000/${pid}/${uid}/projectInfo`; // to get project
      axios
        .get(API, {
          headers: {
            'auth-token': `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log('project response gotten ', res.data);

          setProjInfo({
            owner: res.data.owner,
            description: res.data.description,
            category: res.data.category,
            title: res.data.title,
            goal: res.data.goal,
            purpose: res.data.purpose,
            team: res.data.team,
          });
        })
        .catch((e) => {
          if (e) {
            console.log(e.response.data.error, ' this is response');
            if (e.response.data.error === 'Not Authenticated') {
              console.log(e.response.data.error);
              setErrMessage(e.response.data.error);
            }

            if (e.response.data.error === 'Only investors') {
              setRestricted('only investors are allowed to view projects');
            }
            console.log(e.response.data.error, ' now ');

            if (e.response.data.error === 'not subscribed') {
              setRestricted('Subscribe to view project details');
            }
          }
          console.log('cant get', e);
        });
    }
  }, []);
  return (
    <div className="ProjectViewPage">
      <NavBar />
      <div>
        {errMessage ? (
          <div className="loginPrompt">
            <div className="prompt">
              <h2>Login To View Projects</h2>
              <Link to="/login">
                <button>Click to Login</button>
              </Link>
            </div>
          </div>
        ) : (
          ''
        )}

        {restricted ? (
          <div className="loginPrompt">
            <div className="prompt">
              <h2>{restricted}</h2>
              <Link to="/">
                <button>Back to home</button>
              </Link>
            </div>
          </div>
        ) : (
          ''
        )}

        {inError ? (
          <div className="loginPrompt">
            <div className="prompt">
              <h2>{inError}</h2>
              {console.log('errro')}
              <Link to="/">
                <button onClick={(e) => setInError(null)}>Back to home</button>
              </Link>
              <br />
              <br />
              <button onClick={(e) => setInError(null)}>Cancel</button>
            </div>
          </div>
        ) : (
          ''
        )}

        {errMessage ? (
          ''
        ) : restricted ? (
          ''
        ) : inError ? (
          ''
        ) : (
          <div>
            <h1>Project Info</h1>
            <div>
              <p>Posted By : {projInfo ? projInfo.owner : 'no name'}</p>
            </div>
            <h2>
              Project title : {projInfo ? projInfo.title : 'Project Title here'}
            </h2>
            <h2>Overview</h2>
            <p>
              Descripgion :{' '}
              {projInfo ? projInfo.description : 'Project Description here'}
            </p>
            <h2>Goals</h2>
            <div>{projInfo ? projInfo.goal : 'Project Goals here'}</div>

            <h2>Team Members</h2>
            <div>
              {projInfo ? projInfo.team : 'Project Team members info  here'}
            </div>
            {/* <ul>
          <li>John Doe</li>
          <li>Jane Smith</li>
          <li>Bob Johnson</li>
        </ul> */}
            <div>
              {' '}
              <button onClick={(e) => showInterest()}>
                {isInterested ? 'saved ' : 'show Interest'}
              </button>{' '}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectView;
