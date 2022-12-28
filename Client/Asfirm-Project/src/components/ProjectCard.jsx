import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import './styles/ProjectCard.css';

function ProjectCard(props) {
  const [project, setProject] = useState(props.project);

  //   const [desc, setDesc] = useState(null);
  //   const shortDesc = project.description;
  //   setDesc(shortDesc);

  useEffect(() => {
    setProject(props.project);
    // console.log('got here ', props.project);
  }, []);

  return (
    <div>
      <div class="project-card">
        {/* <img src="project-image.jpg" alt="Project Image" /> */}
        {/* {JSON.stringify(project)} */}
        <div style={{ textAlign: 'center' }}>
          <img
            src={
              project.plan
                ? project.plan.toString()
                : 'https://www.celoxis.com/cassets/img/pmc/project-management.png'
            }
          />
        </div>
        <h3>{`${
          project.title.split(' ')[0].charAt(0).toUpperCase() +
          project.title.split(' ')[0].substring(1)
        } ${
          project.title.split(' ')[1] &&
          project.title.split(' ')[1].charAt(0).toUpperCase() +
            project.title.split(' ')[1].substring(1)
        }`}</h3>
        <div className="proprietor-info">
          <div className="profilePic">
            {project ? (
              project.plan ? (
                <img src={project.plan} />
              ) : project.ownerName ? (
                <h1>
                  {`${project.ownerName.charAt(0)} ${project.ownerName
                    .split(' ')[0]
                    .charAt(0)}`}
                </h1>
              ) : (
                ''
              )
            ) : (
              ''
            )}
          </div>
          <div>
            <h4>
              {project ? (project.ownerName ? project.ownerName : '') : ''}
            </h4>
          </div>
        </div>

        <p>{project.description.substring(0, 50).concat('...')}</p>
      </div>
    </div>
  );
}

export default ProjectCard;
