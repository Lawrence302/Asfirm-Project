import express from 'express';
import Project from '../models/projectModel.js';
import Proprietor from '../models/userModel.js';

const createProject = async (req, res) => {
  // console.log('this route has been called ');
  const data = req.body;

  try {
    const user = await Proprietor.findById(req.params.userId);

    if (!user) {
      return res.status(404).send({ error: 'sorry user does not exist' });
    }

    if (user.userType !== 'proprietor') {
      return res
        .status(403)
        .send({ error: 'only proprietors are allowed to post projects' });
    }

    if (user.sub == 'false') {
      return res.status(403).send({ error: 'subscribe to post projects ' });
    }

    const newProject = await Project({
      ownerID: req.params.userId,
      ownerName: `${user.firstName} ${user.lastName}`,
      title: data.title.toLowerCase(),
      description: data.description,
      category: data.category.toLowerCase(),
      goal: data.goal,
      purpose: data.purpose,
      team: data.team,
    });

    if (!newProject) {
      return res.status(403).send({ error: 'project not created' });
    }

    await newProject.save();

    const updateOwner = await Proprietor.findByIdAndUpdate(
      { _id: req.params.userId },
      { $push: { projects: [newProject._id] } }
    );
    await updateOwner.save();

    res
      .status(200)
      .send({ project: newProject, owner: updateOwner, pid: newProject._id });
  } catch (e) {
    res.status(500).send(e);
  }
};

export default createProject;
