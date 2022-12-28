// to get the project information for single usage like just reading it

import Project from '../models/projectModel.js';
import Person from '../models/userModel.js';

const projInfo = async (req, res) => {
  const id = req.params.projectId;

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

    // if (visitor.userType === 'proprietor') {
    //   return res.status(404).send({ error: 'Only investors' });
    // }

    // if (!visitor.sub) {
    //   return res.status(400).send({ error: 'subscribe' });
    // }

    res.status(200).send({
      id: proj._id,
      owner: `${proprietor.firstName} ${proprietor.lastName}`,
      plan: proj.plan,
      title: `${proj.title.charAt(0).toUpperCase()}${proj.title.substring(1)} `,

      description: proj.description,
      category: `${proj.category
        .charAt(0)
        .toUpperCase()}${proj.category.substring(1)} `,
      goal: proj.goal,
      purpose: proj.purpose,
      team: proj.team,
      views: proj.views,
      like: proj.likes,
    });
  } catch (e) {
    res.status(500).send(e);
  }
};

export default projInfo;
