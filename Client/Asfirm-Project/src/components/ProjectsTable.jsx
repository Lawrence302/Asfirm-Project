import React, { useEffect, useState } from 'react';
import './styles/ProjectsTable.css';
import NavBar from './NavBar';
import Footer from './Footer';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getUserProjects } from '../features/user/userInfoSlice';
import { Link, useNavigate } from 'react-router-dom';

// const accessToken = JSON.parse(localStorage.info).accessToken; // getting the token from storage
// const id = JSON.parse(localStorage.info).id; // getting id from storage
// const API = `http://localhost:3000/${id}/myProjects`;

function ProjectsTable(props) {
  const [errMessage, setErrMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);
  const [notInterested, setNotInterested] = useState(false);
  const [active, setActive] = useState(props.auth);
  const proj = useSelector((state) => {
    state.userData.projects;
  });

  const [projects, setProjects] = useState(null);
  // const [userActive, setUserActive] = useState(false);
  const dispatch = useDispatch();

  const saveId = (id) => {
    localStorage.removeItem('projectId');
    // console.log('this saved ', id);
    localStorage.setItem('projectId', JSON.stringify({ id: id }));
    // console.log('this id is ', id);
    setTimeout(() => {
      navigate('/editProject');
    }, 500);
  };

  const view = (id) => {
    localStorage.removeItem('projectId');
    // console.log('this saved ', id);
    localStorage.setItem('projectId', JSON.stringify({ id: id }));
    // console.log('this id is ', id);

    setTimeout(() => {
      navigate('/projectView');
    }, 500);
  };

  const uinterested = (pid) => {
    const accessToken = JSON.parse(localStorage.getItem('info')).accessToken;
    const uid = JSON.parse(localStorage.getItem('info')).id;
    const UIAPI = `http://localhost:3000/${pid}/${uid}/removeInterest`;

    axios
      .patch(UIAPI, {
        headers: {
          'auth-token': `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setSuccessMessage(res.data.message);
        setNotInterested(true);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e.response.data, ' from delete ');
      });
  };

  const globalPage = <div>Login to access your projects</div>;
  // deleting a project
  const projDel = (id) => {
    // console.log('delete was called ');
    // router.delete('/:projectId/project', deleteProject);
    // router.delete('/:projectId/project', deleteProject);
    const accessToken = JSON.parse(localStorage.getItem('info')).accessToken;
    const delAPI = `http://localhost:3000/${id}/project`;
    axios
      .delete(delAPI, {
        headers: { 'auth-token': `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log(res.data);
        // window.location.reload();
        setDeleted(true);
      })
      .catch((e) => {
        if (e) {
          console.log(e.response);
        }
        // console.log(e);
      });
  };
  //////////////////

  useEffect(() => {
    const information = () => {
      const accessToken = JSON.parse(localStorage.getItem('info')).accessToken; // getting the token from storage
      const id = JSON.parse(localStorage.getItem('info')).id; // getting id from storage

      if (!accessToken || !id) return;

      const API = `${import.meta.env.VITE_LINK_URL}/${id}/myProjects`;
      axios
        .get(API, {
          headers: {
            'auth-token': `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log('projects from table', res.data);
          setProjects(res.data);
          // dispatch(authStatus(true));
          // dispatch(getUserData(res.data));
          dispatch(getUserProjects(res.data.Projects));
        })
        .catch((e) => {
          if (e) {
            if (e.response.data.error === 'Not Authenticated') {
              setErrMessage('Login');
            }
          }
          // console.log('from projtable ', e.response.data.error);
        });
    };

    information();
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  }, [successMessage]);

  return (
    <div>
      {/* {console.log('in proj', active)} */}
      {/* {projects ? console.log(projects.userType) : ' not project'} */}

      <h2> My Projects</h2>
      <div>
        {successMessage ? <div> {successMessage} </div> : ''}
        <div>{deleted ? 'project deleted ' : ''}</div>
        <table border="1">
          <thead>
            <tr>
              <th className="projectCul">Project</th>
              <th>Description</th>
              <th>Views</th>
              <th>Likes</th>
              <th>Date</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {/* {projects.userType === 'investor' ? '' : ''} */}
            {projects ? (
              projects.userType === 'proprietor' ? (
                projects.projects.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {' '}
                        <h2>{data.title}</h2> <p>{data.category}</p>
                      </td>
                      <td>{data.description.slice(0, 50) + '...'}</td>
                      <th></th>
                      <td>{data.views}</td>
                      <td>{data.createdAt}</td>
                      <td>
                        <button
                          id={`${data.id}`}
                          onClick={(e) => saveId(e.target.id)}
                        >
                          Edit
                        </button>
                        <button onClick={(e) => projDel(data.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : projects.userType === 'investor' ? (
                projects.projects.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {' '}
                        <h2>{data.title}</h2> <p>{data.category}</p>
                      </td>
                      <td>{data.description.slice(0, 50) + '...'}</td>
                      <th></th>
                      <td>{data.views}</td>
                      <td>{data.createdAt}</td>
                      <td>
                        <button
                          id={`${data._id}`}
                          onClick={(e) => view(e.target.id)}
                        >
                          view
                        </button>
                        <button onClick={(e) => uinterested(data._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <div>No projects to show</div>
                // No projects to show
              )
            ) : (
              <div>No Projects to show</div>
            )}
          </tbody>
        </table>
      </div>
      <globalPage />
      {/* <Footer /> */}
    </div>
  );
}

export default ProjectsTable;
