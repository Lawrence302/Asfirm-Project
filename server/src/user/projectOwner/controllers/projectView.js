import mongoose from 'mongoose';

import Project from '../models/projectModel.js';
import Person from '../models/userModel.js';

const projectView = async (req, res) => {
  try {
    const user = await Person.findById(req.params.userId);
    const proj = await Project.findById(req.params.projectId);

    if (!user) {
      res.status(404).send('user not found');
      return;
    }

    if (!proj) {
      res.status(404).send('project not found');
      return;
    }

    if (user.userType === 'proprietor' && req.params.userId != proj.ownerID) {
      res.send({
        restrinction: 'sorry only investors are allowed to wiew projects',
      });
      return;
    }

    if (proj.views.includes(user._id)) {
      res.status(200).json('already viewed');
      return;
    }

    await Project.findByIdAndUpdate(
      { _id: req.params.projectId },
      { $push: { views: [req.params.userId] } }
    );

    res.status(200).json('view has been added');
  } catch (e) {
    res.status(500).send(e);
  }
};

export default projectView;
