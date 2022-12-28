// updating project informations

import Project from '../models/projectModel.js';

const projectUpdate = async (req, res) => {
  // console.log(req);
  const updates = Object.keys(req.body.projInfo);
  const allowedUpdates = [
    'title',
    'discription',
    'category',
    'goal',
    'purpose',
    'team',
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  // console.log('this allowed ', isValidOperation);

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid Updates!' });
  }

  const update = {
    title: req.body.projInfo.title.toLowerCase(),
    category: req.body.projInfo.category.toLowerCase(),

    description: req.body.projInfo.discription,
    goal: req.body.projInfo.goal,
    purpose: req.body.projInfo.purpose,
    team: req.body.projInfo.team,
  };

  try {
    console.log(req.params.projectId);
    const newProject = await Project.findByIdAndUpdate(
      req.params.projectId,
      update,
      { new: true }
    );

    if (!newProject) {
      return res.status(404).send();
    }

    res.send(newProject);
  } catch (e) {
    res.status(400).send(e);
  }
};

export default projectUpdate;
