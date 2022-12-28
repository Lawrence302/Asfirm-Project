import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import NavBar from './NavBar';
import ProjectCard from './ProjectCard';
import { FaSearch } from 'react-icons/fa';
import { config } from 'dotenv';
import './styles/Projects.css';

function Projects() {
  const appid = import.meta.env.VITE_APPID;
  const navigate = useNavigate();
  const [projects, setProjects] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const viewProject = (id) => {
    if (localStorage.getItem('projectId')) {
      localStorage.removeItem('projectId');
    }
    localStorage.setItem('projectId', JSON.stringify({ id: id }));
    console.log('this id is before living ', id);

    setTimeout(function () {
      navigate('/projectView');
      console.log('aiterd ');
    }, 500);
  };

  const searchProject = (e) => {
    e.preventDefault();
    console.log(searchTerm);
    const SAPI = `${import.meta.env.VITE_LINK_URL}/project?term=${searchTerm}`;
    axios
      .get(SAPI)
      .then((res) => {
        console.log('search result ', res.data);
        setProjects(res.data);
      })
      .catch((e) => {
        if (e) {
          // console.log(e.response);
        }
        // console.log(e)
      });
  };

  const inputDef = (e) => {
    // e.preventDefault();
    if (e.key == 'Enter') {
      searchProject(e);
    }
  };

  useEffect(() => {
    const API = `${import.meta.env.VITE_LINK_URL}/projects`;
    console.log('process ', import.meta.env);
    axios
      .get(API)
      .then((res) => {
        // console.log('data from projects ', res.data);
        setProjects(res.data);
      })
      .catch((e) => {
        // console.log(e);
      });

    window.addEventListener('keypress', (e) => {
      if (e.target == 13) {
        setTimeout(() => {}, 3000);
        console.log(e.target);
        e.preventDefault();
      }
    });
  }, []);
  return (
    <div>
      <NavBar />
      <div className="Projects-Page">
        <h1>Project Gallery</h1>
        {/* {projects ? JSON.stringify(projects) : ''} */}

        <form className="projectSearchForm">
          <label>
            <div className="iconDiv">
              <FaSearch
                className="searchIcon"
                onClick={(e) => searchProject(e)}
              />
            </div>
            <div className="searchDiv">
              <input
                className="search"
                value={searchTerm}
                type="text"
                name="search"
                onKeyDown={(e) => inputDef(e)}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </label>
        </form>

        <h2>Featured Projects</h2>
        <div className="projects featured-projects">
          <ul>
            {projects
              ? projects.map((project) => {
                  return (
                    <li key={project._id}>
                      {/* {console.log('this is ', project.title)} */}
                      <ProjectCard project={project} />

                      <button
                        className="projViewBtn"
                        id={project._id}
                        onClick={(e) => viewProject(e.target.id)}
                      >
                        See More
                      </button>
                    </li>
                  );
                })
              : ''}
          </ul>
        </div>

        <h2>All Projects</h2>
        <div className="projects">
          <ul>
            <li>Project A</li>
            <li>Project B</li>
            <li>Project C</li>
            ...
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Projects;
