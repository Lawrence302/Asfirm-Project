import Person from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const isLoggedIn = async (req, res, next) => {
  const header = req.header('auth-token');
  const token = header && header.split(' ')[1];
  // console.log(token);

  if (!token) {
    return res.status(404).send({ error: 'Not Authenticated' });
  }
  let message = 'not loggedIn ';

  try {
    const verifyToken = jwt.verify(token, 'saveToHave');
    // console.log(verifyToken);

    if (!verifyToken) {
      return res.status(400).send({ error: 'Not Authenticated' });
    }

    if (verifyToken.load != req.params.userId) {
      return res.status(400).send({ error: 'wrong user' });
    }

    message = 'logged In';

    const id = verifyToken.load;
    // console.log(id)
    const user = await Person.findById(id);
    // console.log(token)

    const userHasToken = user.refreshToken.includes(token);

    if (!userHasToken) {
      return res.status(400).send({ error: 'Not Authenticated' });
    }

    res.status(200).send({
      firstName: user.firstName,
      lastName: user.lastName,
      country: user.country,
      type: user.userType,
      sub: user.sub,
    });
  } catch (e) {
    // console.log(e.message);
    res.status(500).send(e.message);
  }
};

export default isLoggedIn;
