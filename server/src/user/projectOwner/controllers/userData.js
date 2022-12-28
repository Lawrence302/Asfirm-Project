//getting user information
import Person from '../models/userModel.js';

const userData = async (req, res) => {
  const id = req.params.userId;
  console.log(id, req.params);

  try {
    if (!id) {
      return res.status(400).send({ error: 'provide a valid user id' });
    }

    const user = await Person.findById(id);

    if (!user) {
      return res.status(404).send({ error: 'user not found' });
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
};

export default userData;
