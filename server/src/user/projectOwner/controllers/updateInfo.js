import express from 'express';
import Person from '../models/userModel.js';

// updates firstName,lastName , data of birth ,  country , and ,email

const updateInfo = async (req, res) => {
  // restricting the updates to receive
  const updates = Object.keys(req.body.user);
  const allowedUpdates = ['firstName', 'lastName', 'dob', 'country', 'email'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  // console.log(req.body.user);

  // console.log('this allowed ', isValidOperation);

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid Updates!' });
  }

  try {
    const user = await Person.findById(req.params.userId);

    if (!user) {
      return res.status(404).send({ error: 'user not found ' });
    }

    const update = {
      firstName:
        req.body.user.firstName == ''
          ? user.firstName
          : req.body.user.firstName,
      lastName:
        req.body.user.lastName == '' ? user.lastName : req.body.user.lastName,
      country:
        req.body.user.country == '' ? user.country : req.body.user.country,
      email: req.body.user.email == '' ? user.email : req.body.user.email,
    };

    const newPerson = await Person.findByIdAndUpdate(
      req.params.userId,
      update,
      { new: true }
    );

    if (!newPerson) {
      return res.status(404).send();
    }

    // console.log('tis id new ', newPerson);

    res.send(newPerson);
  } catch (e) {
    // console.log(e);
    res.status(500).send(e);
  }
};

const updatePass = async (req, res) => {
  const str = req.body.newPassword; // new password
  const oldPass = req.body.oldPassword; // old password

  // console.log(' \' ', str , ' \' ')
  // console.log(' \' ', str.trim() , ' \' ')
  // console.log(' \' ', str.trim().length , ' \' ')

  if (!oldPass) {
    return res.status(400).send({ error: 'old password required' });
  }

  // geting the presend password form the database
  const oldPassVerification = await Person.findById(req.params.userId);

  if (!str) {
    return res.status(400).send({ error: 'bad request ' });
  }

  if (str.trim().length < 6) {
    return res
      .status(400)
      .send({ error: 'password should not be less than 6 characters ' });
  }

  // comparing the old password and the one received from the user input if it is a match
  if (oldPassVerification.userPassword !== oldPass.trim()) {
    return res.status(400).send({ error: 'passwords do not mathch' });
  }

  // console.log( oldPassVerification.userPassword.toString() , ' new ' + oldPass.trim())

  // updating the password
  const newp = await Person.findByIdAndUpdate(
    req.params.userId,
    { userPassword: req.body.newPassword },
    { new: true }
  );

  res.status(200).send(newp);
};

export { updatePass };

export default updateInfo;
