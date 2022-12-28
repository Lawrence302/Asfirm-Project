import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProjectSchema = mongoose.Schema(
  {
    ownerID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    ownerName: {
      type: String,
    },
    title: String,
    description: String,
    category: {
      type: String,
      require: true,
    },
    plan: {
      type: String,
    },
    goal: {
      type: String,
    },
    team: {
      type: String,
    },
    purpose: {
      type: String,
    },
    investorsInterested: {
      type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    views: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', ProjectSchema);

export default Project;
