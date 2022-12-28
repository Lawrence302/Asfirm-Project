import React from 'react';
import { Link } from 'react-router-dom';
import { createProject } from '../features/user/createProject';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './styles/CreateProject.css';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react';

// const accessToken = JSON.parse(localStorage.getItem('info')).accessToken; // getting the token from storage
// const id = JSON.parse(localStorage.getItem('info')).id; // getting id from storage
// const API = `http://localhost:3000/${id}/signedIn`;

function CreateProject(props) {
  // const proj = useSelector((state) => state.createProject.data);
  const dispatch = useDispatch();
  const [sub, setSub] = useState(props.sub);
  const [errMessage, setErrMessage] = useState(null);
  const [dataValidation, setDataValidation] = useState(true);
  const [success, setSuccess] = useState(false);

  const [projInfo, setProjInfo] = useState({
    title: '',
    domain: '',
    discription: '',
    goal: '',
    purpose: '',
    team: '',
  });

  const domainTypes = [
    'Agriculture',
    'Entertainment',
    'Fashion',
    'Finance and Economic',
  ];
  const domainSelect = (domain, index) => {
    <option htmlFor={domain} key={index}>
      {' '}
      {domain}{' '}
    </option>;
  };

  const submitProject = (e) => {
    e.preventDefault();
    // console.log('before calling dispatch');
    // console.log('for creating project permission ', sub);
    // console.log(projInfo);
    // dispatch(createProject(projInfo));
    // console.log(projInfo);
    const accessToken = JSON.parse(localStorage.getItem('info')).accessToken; // getting the token from storage
    const id = JSON.parse(localStorage.getItem('info')).id; // getting id from storage

    const API = `http://localhost:3000/${id}/project`;

    if (!projInfo.title || !projInfo.domain || !projInfo.discription) {
      setDataValidation(false);
      return;
    }

    setDataValidation(true);

    try {
      axios
        .post(API, {
          title: projInfo.title,
          description: projInfo.discription,
          category: projInfo.domain,
          goal: projInfo.goal,
          purpose: projInfo.purpose,
          team: projInfo.team,
        })
        .then((res) => {
          console.log(res.status, res.data);
          localStorage.setItem(
            'projectId',
            JSON.stringify({ id: res.data.pid })
          );
          setSuccess(true);
        })
        .catch((e) => {
          console.log(' error occured in proj post ', e.response.data);

          setErrMessage(e.response.data);
          console.log();
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="CreateProject-page">
      <h1 className="heading">Create a Project</h1>
      {console.log('for creating project permission before ', sub)}

      <form action="POST">
        <label htmlFor="title">Title : </label>
        <input
          placeholder="Enter Your Project Title"
          value={projInfo.title}
          onChange={(e) => setProjInfo({ ...projInfo, title: e.target.value })}
        />
        <br />

        <label htmlFor="domain"> Domain : </label>
        <select
          value={projInfo.domain}
          onChange={(e) => setProjInfo({ ...projInfo, domain: e.target.value })}
        >
          {domainTypes.map((domain, index) => {
            return (
              <option htmlFor={domain} key={index}>
                {' '}
                {domain}{' '}
              </option>
            );
          })}
        </select>
        <br />

        <label htmlFor="discription">Discription : </label>
        <br />
        <textarea
          value={projInfo.discription}
          onChange={(e) =>
            setProjInfo({ ...projInfo, discription: e.target.value })
          }
          rows="4"
          cols="50"
          placeholder="Enter your Project description here"
        ></textarea>
        <br />
        {/* purpose of project */}
        <label htmlFor="purpose">Purpose : </label>
        <br />
        <textarea
          value={projInfo.purpose}
          onChange={(e) =>
            setProjInfo({ ...projInfo, purpose: e.target.value })
          }
          rows="4"
          cols="50"
          placeholder="Enter  Project purpose here"
        ></textarea>
        <br />

        {/* project goals */}
        <label htmlFor="goal">Project Goal : </label>
        <br />
        <textarea
          value={projInfo.goal}
          onChange={(e) => setProjInfo({ ...projInfo, goal: e.target.value })}
          rows="4"
          cols="50"
          placeholder="Enter Project goal here"
        ></textarea>
        <br />

        {/* Team members */}
        <label htmlFor="team">Team members : </label>
        <br />
        <textarea
          value={projInfo.team}
          onChange={(e) => setProjInfo({ ...projInfo, team: e.target.value })}
          rows="4"
          cols="50"
          placeholder="Informaton about  Project team members"
        ></textarea>

        <br />
        <div>
          {dataValidation ? (
            ' '
          ) : (
            <div style={{ color: 'red', fontSize: '10px' }}>
              All fields are required
            </div>
          )}
        </div>
        <div style={{ color: 'red', fontSize: '10px' }}>
          {errMessage ? errMessage.error : ''}
        </div>
        <div className="btn-div">
          <button
            type="submit"
            onClick={submitProject}
            disabled={success ? true : false}
          >
            Save Project
          </button>

          <Link to="/user/uploads">
            <button disabled={success ? false : true}>
              {' '}
              Next <ArrowForwardIcon />
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default CreateProject;
