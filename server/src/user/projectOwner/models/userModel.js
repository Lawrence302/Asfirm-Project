import mongoose from 'mongoose';
import validator from 'email-validator';
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    age: { type: Number, min: 18 },
    dob: Date,
    occupation: String,
    country: { type: String, required: true },
    userType: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.validate(value)) {
          throw new Error('Please enter a valid email');
        }
      },
    },
    date: {
      type: String,
      required: true,
    },
    userPassword: {
      type: String,
      required: true,
    },
    // will specify various categories 1 or 2 (cat1 , cat2) for investor
    sub: {
      type: String,
    },
    // // proprietor subscrition
    // propSub: {
    //   type: Boolean,
    // },
    projects: [{ type: mongoose.Types.ObjectId, ref: 'Project' }],

    //// investor specific requirements

    domainOfInterest: {
      type: String,
    },
    projectsOfInterest: [{ type: mongoose.Types.ObjectId, ref: 'Project' }],
    hasAccess: Boolean,
    favourite: [{ type: mongoose.Types.ObjectId, ref: 'Project' }],
    accessCategory: String,
    refreshToken: [],
  },
  { timestamps: true }
);

const Person = mongoose.model('User', UserSchema);

export default Person;
