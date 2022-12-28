import Person from '../models/userModel.js';

import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
import auth from './auth.js';

const login = async (req, res) => {
  const info = req.body;

  try {
    if (!info.email || !info.userPassword) {
      return res.status(400).send({ error: 'email and password is required ' });
    }

    const user = await Person.findOne({ email: info.email });

    if (!user) {
      return res.status(400).send({ error: 'wrong email or password ' });
    }

    const signin = await bcrypt.compare(info.userPassword, user.userPassword);
    console.log(signin);

    if (!signin) {
      return res.status(400).send({ error: 'wrong email or password ' });
    }
    const id = user.id.toString();

    const accessToken = await generateAccessToken(id);
    // const refreshToken = await jwt.sign({ load: id }, 'saveToRefresh');

    // if (!refreshToken) {
    //   return res.send('login not successful ');
    // }

    if (!accessToken) {
      return res.send('login not successful ');
    }

    await Person.findOneAndUpdate(
      { _id: user._id },
      { $push: { refreshToken: accessToken } },
      { new: true }
    );

    // console.log(accessToken, "here")

    // res.send({accessToken : accessToken , "refreshToken" : refreshToken, user})
    res.header('auth-token', accessToken).status(200).send({ accessToken, id });
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const generateAccessToken = async (load) => {
  const token = await jwt.sign({ load }, process.env.TOKEN_KEY, {
    expiresIn: '600s',
  });
  return token;
};

export { generateAccessToken };

export default login;
