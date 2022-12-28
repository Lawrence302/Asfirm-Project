import Person from '../models/userModel.js';
import Project from '../models/projectModel.js';

const removeInterest = async (req, res) => {
  const pid = req.params.pid;
  const uid = req.params.uid;

  try {
    const user = await Person.findById(uid);

    if (!user) {
      return res.status(404).send({ error: 'user not found' });
    }

    // if (user.userType == 'proprietor') {
    //   return res
    //     .status(400)
    //     .send({ error: 'Only Investors are allowed to peform this operation' });
    // }

    const proj = await Project.findById(pid);
    if (!proj) {
      return res.status(404).send({ error: 'project not found' });
    }

    if (!user.projectsOfInterest.includes(pid)) {
      return res
        .status(400)
        .send({ error: 'already removed from interested projects' });
    }

    // console.log(user.projectsOfInterest);

    await Person.findByIdAndUpdate(
      { _id: user._id },
      { $pull: { projectsOfInterest: pid } }
    );

    await Project.findByIdAndUpdate(
      { _id: proj._id },
      { $pull: { investorsInterested: uid } }
    );

    res.status(200).send({
      message: 'removed from interest',
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};

export default removeInterest;
