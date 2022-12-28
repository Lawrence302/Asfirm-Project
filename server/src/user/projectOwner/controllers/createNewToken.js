import jwt from 'jsonwebtoken';
import Person from '../models/userModel.js';

import { generateAccessToken } from './login.js';

const refreshToken = async (req, res) => {
  const refToken = req.body.token;
  if (refToken == null) {
    return res.status(401).send('invalid token');
  }

  // console.log(req.params.id)
  try {
    const user = await Person.findById(req.params.id);

    console.log(user.refreshToken);

    if (!user.refreshToken) {
      return res.send('user not found');
    }

    const token = user.refreshToken.includes(req.body.token);
    if (!token) {
      return res.status(404).send();
    }

    const tokenVerification = await jwt.verify(
      req.body.token,
      process.env.REF_TOKEN
    );

    if (!tokenVerification) {
      return res.status(403).send();
    }

    const newAccessToken = await generateAccessToken(user.email);
    console.log(newAccessToken);

    res.send({ newToken: newAccessToken });
  } catch (e) {
    res.status(500).send(e);
  }
};

export default refreshToken;
