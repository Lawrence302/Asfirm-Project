import Project from '../models/projectModel.js';
import planModel from '../models/planModel.js';
import Person from '../models/userModel.js';

const deleteProject = async (req, res) => {
  const id = req.params.projectId;
  // console.log(id, ' the id');
  try {
    const proj = await Project.findById(id);

    if (!proj) {
      return res.status(404).send('Project not found');
    }

    const plan = await planModel.findOne({ projectID: proj._id });

    const user = await Person.findById(proj.ownerID);

    if (plan) {
      await planModel.findByIdAndDelete(plan._id);
    }
    if (user) {
      await Person.findByIdAndUpdate(proj.ownerID, {
        $pull: { projects: proj._id },
      });
    }

    await Project.findByIdAndDelete(id);

    res.send({ proj: proj, plan: plan, user: user });
  } catch (e) {
    res.status(500).send(e);
  }
};

export default deleteProject;
