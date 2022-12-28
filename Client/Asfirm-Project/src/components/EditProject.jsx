import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/EditProject.css';

// const accessToken = JSON.parse(localStorage.getItem('info')).accessToken; // getting the token from storage
const id = JSON.parse(localStorage.getItem('info')).id; // getting id from storage
// const pid = JSON.parse(localStorage.getItem('projectId')).id; // project id from local storage
// const API = `http://localhost:3000/${pid}/projectInfo`; // to get project
// const API2 = `http://localhost:3000/${pid}/project`; //to edit project info for editing
//const API = `http://localhost:3000/${id}/${pid}/project`; // for proj views count
function EditProject() {
  const [newProject, setNewProject] = useState(null);
  const [projInfo, setProjInfo] = useState({
    title: '',
    category: '',
    discription: '',
    goal: '',
    purpose: '',
    team: ' ',
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

  const editProject = (e) => {
    e.preventDefault();
    const accessToken2 = JSON.parse(localStorage.getItem('info')).accessToken;
    const pid2 = JSON.parse(localStorage.getItem('projectId')).id;
    const API2 = `http://localhost:3000/${pid2}/project`;
    // const pid = JSON.parse(localStorage.getItem('projectId')).id;
    // axios.patch(API2);

    axios
      .patch(
        API2,
        { projInfo },
        {
          headers: {
            'auth-token': `Bearer ${accessToken2}`,
          },
        }
      )
      .then((res) => {
        console.log('edited success on project ', res.data);
        setNewInfo(res.data);
        setInfo(res.data);
        console.log('new Info  state for proj', newInfo);
      })
      .catch((e) => {
        console.log(e.response);
      });

    //   console.log('');
  };

  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem('info')).accessToken;
    // const uid = JSON.parse(localStorage.getItem('info')).id;
    const pid = JSON.parse(localStorage.getItem('projectId')).id; // project id from local storage
    const API = `http://localhost:3000/${pid}/projectInfo`; // to get project
    axios
      .get(API, {
        headers: {
          'auth-token': `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log('project response gotten ', res.data);
        setProjInfo({
          ...projInfo,
          discription: res.data.description,
          category: res.data.category,
          title: res.data.title,
          goal: res.data.goal,
          team: res.data.team,
          purpose: res.data.purpose,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className="EditProject-page">
      <h1 className="heading">Edit Project</h1>
      {/* {console.log(newProject)} */}

      <form>
        <label htmlFor="title">Title : </label>
        <input
          placeholder={projInfo ? projInfo.title : 'Project Title '}
          value={projInfo.title}
          onChange={(e) => setProjInfo({ ...projInfo, title: e.target.value })}
        />
        <br />

        <label htmlFor="domain"> Please select category : </label>
        <select
          value={projInfo.category}
          onChange={(e) =>
            setProjInfo({ ...projInfo, category: e.target.value })
          }
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
        {/* Project goals */}
        <label htmlFor="goal">Project Goals : </label>
        <br />
        <textarea
          value={projInfo.goal}
          onChange={(e) => setProjInfo({ ...projInfo, goal: e.target.value })}
          rows="4"
          cols="50"
          placeholder="Enter  Project goals here"
        ></textarea>
        <br />

        {/* Project purpose */}
        <label htmlFor="purpose">Project purpose : </label>
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

        <br />
        <div className="btn-div">
          <button type="submit" onClick={editProject}>
            <Link to="/user/dashboard">Save And Exit</Link>
          </button>
          <Link to="/user/uploads">
            <button>Change Project Photo</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditProject;
