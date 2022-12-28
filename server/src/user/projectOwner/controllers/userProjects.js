import Project from '../models/projectModel.js';
import Person from '../models/userModel.js';

const myProjects = async (req, res) => {
  try {
    // console.log(req.params.userId);
    const user = await Person.findById({ _id: req.params.userId });

    if (!user) {
      return res.status(404).send({ message: 'user not found', user });
    }
    let projInterest = [];
    if (user.userType === 'investor') {
      const projects = user.projectsOfInterest;

      const objectPromises = projects.map((objectId) =>
        Project.findById(objectId)
      );

      try {
        const object = await Promise.all(objectPromises);
        // do something with the objects
        projInterest.push(object);
      } catch (err) {
        // handle the error
      }
      // console.log('this is the all ', projInterest);

      return res
        .status(200)
        .send({ userType: 'investor', projects: projInterest[0] });
    }

    const projects = await Project.find({ ownerID: req.params.userId });

    const proj = [];

    projects.forEach((project) => {
      return proj.push({
        id: project._id,
        owner: project.ownerName,
        title: `${project.title
          .charAt(0)
          .toUpperCase()}${project.title.substring(1)} `,
        description: project.description,
        category: `${project.category
          .charAt(0)
          .toUpperCase()}${project.category.substring(1)} `,
        goal: project.goal,
        purpose: project.purpose,
        team: project.team,
        views: projects.views,
        likes: projects.likes,
      });
    });

    // console.log(proj);

    res.send({
      userType: 'proprietor',
      noOfProjects: user.projects.length,
      projects: proj,
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export default myProjects;
