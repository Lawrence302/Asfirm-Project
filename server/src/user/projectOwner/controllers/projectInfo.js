// for viewing purpose to view project

import Project from '../models/projectModel.js';
import Person from '../models/userModel.js';

const projectInfo = async (req, res) => {
  const id = req.params.projectId;
  const visitorId = req.params.userId;
  //   console.log(req.params);
  try {
    const proj = await Project.findById(id);
    // console.log('project ', proj);
    if (!proj) {
      return res.status(404).send({ error: 'project not found ' });
    }

    const proprietor = await Person.findById(proj.ownerID);
    if (!proprietor) {
      return res.status(404).send({ error: 'project not found proprietor' });
    }

    const visitor = await Person.findById(visitorId);
    if (!visitor) {
      return res.status(404).send({ error: 'Un Authorized ' });
    }

    if (visitor.userType === 'proprietor') {
      return res.status(400).send({ error: 'Only investors' });
    }

    if (visitor.sub === 'false') {
      return res.status(400).send({ error: 'not subscribed' });
    }

    res.status(200).send({
      id: proj._id,
      owner: `${proprietor.firstName} ${proprietor.lastName}`,

      title: `${proj.title.charAt(0).toUpperCase()}${proj.title.substring(1)} `,
      description: proj.description,
      category: `${proj.category
        .charAt(0)
        .toUpperCase()}${proj.category.substring(1)} `,
      goal: proj.goal,
      purpose: proj.purpose,
      team: proj.team,
      photo: proj.plan,
      views: proj.views,
      like: proj.likes,
    });
  } catch (e) {
    res.status(500).send(e);
  }
};

export default projectInfo;
