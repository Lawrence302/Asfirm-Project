// import { TokenExpiredError } from "jsonwebtoken";
import Person from '../models/userModel.js';

const logout = async (req, res) => {
  try {
    // const authHeader = req.header
    // const token = authHeader && authHeader.split(' ')[1]
    // console.log(token, "here");

    const user = await Person.findById(req.params.id);

    if (!user) {
      res.status(404).send();
    }

    await Person.findByIdAndUpdate(
      { _id: req.params.id },
      { refreshToken: [] },
      { new: true }
    );

    // req.header = '';
    // console.log(user);
    res.status(200).send({ message: 'loged out' });
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export default logout;
