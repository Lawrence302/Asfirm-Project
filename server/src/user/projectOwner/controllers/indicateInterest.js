import Person from '../models/userModel.js';
import Project from '../models/projectModel.js';

const indicateInterest = async (req, res) => {
  // console.log(req);
  const pid = req.params.pid;
  const uid = req.params.uid;

  try {
    const user = await Person.findById(uid);

    if (!user) {
      return res.status(404).send({ error: 'user not found' });
    }

    if (user.userType == 'proprietor') {
      return res
        .status(400)
        .send({ error: 'Only Investors are allowed to indicate interes ' });
    }

    const proj = await Project.findById(pid);
    if (!proj) {
      return res.status(404).send({ error: 'project not found' });
    }

    if (user.projectsOfInterest.includes(pid)) {
      return res
        .status(400)
        .send({ error: 'already added to interested in project' });
    }

    await Person.findByIdAndUpdate(
      { _id: uid },
      { $push: { projectsOfInterest: [pid] } }
    );

    if (proj.investorsInterested.includes(uid)) {
      return res.status(400).send({ error: 'already interested in project ' });
    }
    await Project.findByIdAndUpdate(
      { _id: pid },
      { $push: { investorsInterested: [uid] } }
    );

    res.status(200).send({
      message: 'interest Indicated',
    });
  } catch (e) {
    return res.status(500).send(e);
  }

  //   res.send({ message: 'indicated interest', info: `${pid} ${uid}` });
};

export default indicateInterest;
