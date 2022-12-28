import mongoose from 'mongoose';
import moment from 'moment';

import bcrypt from 'bcrypt';

import Person from '../models/userModel.js';

// this route registers the proprietor's information in the site
const registerUser = async (req, res) => {
  try {
    const info = req.body;

    let time = `${moment().format('L')} - ${moment().format('LTS')}`;

    if (
      !info.email ||
      !info.userPassword ||
      !info.country ||
      !info.userType ||
      !info.firstName
    ) {
      return res
        .status(400)
        .send({ error: 'provide values for required fields ' });
    }
    // console.log('begore adding info')
    // console.log(req.body)

    const registered = await Person.findOne({ email: info.email });
    // console.log(registered);

    if (registered) {
      if (registered.email === info.email) {
        return res
          .status(403)
          .send({ forbidden: 'user with email already exist ' });
      }
    }

    // console.log('her here');

    // let hashedPassword = bcrypt.hashSync( info.password , 10 )
    // console.log(info.userPassword)

    let hashedPassword = await bcrypt.hash(info.userPassword, 10);
    // console.log(hashedPassword);

    const user = await new Person({
      firstName: info.firstName,
      lastName: info.lastName,
      country: info.country,
      email: info.email,
      userPassword: hashedPassword,
      userType: info.userType,
      date: time,
      sub: 'false',
    });

    await user.save();
    // console.log(user);
    // console.log('after save');
    res
      .status(200)
      .send({ success: ' Succesfully registered user ', userInfo: user });

    // res.send('okey')
  } catch (e) {
    res.send(e);
  }
};

export default registerUser;
