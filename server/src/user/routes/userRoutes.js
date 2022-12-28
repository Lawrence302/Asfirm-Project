import express from 'express';
import multer from 'multer';
import path, { dirname } from 'path';

import planFileUpload from '../projectOwner/controllers/planUploadController.js';
import allUsers from '../projectOwner/controllers/fetchAllUsers.js';

import updateInfo, {
  updatePass,
} from '../projectOwner/controllers/updateInfo.js';
import projectUpdate from '../projectOwner/controllers/projectInfoUpdate.js';

import createProject from '../projectOwner/controllers/projectController.js';
import registerUser from '../projectOwner/controllers/registerUser.js';

import projectView from '../projectOwner/controllers/projectView.js';
import myProjects from '../projectOwner/controllers/userProjects.js';

import deleteProject from '../projectOwner/controllers/deleteProject.js';
import deletePlan from '../projectOwner/controllers/deletePlan.js';

import searchProject from '../projectOwner/controllers/searchProjects.js';

import login from '../projectOwner/controllers/login.js';

import testOne from '../projectOwner/controllers/test.js';

import auth from '../projectOwner/controllers/auth.js';
import refreshToken from '../projectOwner/controllers/createNewToken.js';
import logout from '../projectOwner/controllers/logout.js';

// to make __dirname and __filename work in node when type : module is enabled
// this is because the type module import does not have these variables

import { fileURLToPath } from 'url';
import { userInfo } from 'os';
import isLoggedIn from '../projectOwner/controllers/isLoggedIn.js';

import userData from '../projectOwner/controllers/userData.js';
import projectInfo from '../projectOwner/controllers/projectInfo.js';
import getAllProjects from '../projectOwner/controllers/fetchAllPojects.js';
import indicateInterest from '../projectOwner/controllers/indicateInterest.js';
import projInfo from '../projectOwner/controllers/projInfo.js';
import removeInterest from '../projectOwner/controllers/removeInterest.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// the above is relevant

const router = express.Router();
// const upload = multer({ dest: './src/public/files' })
// const upload = multer({ dest: "./src/public/uploads/files" })

router.post('/user/register', registerUser);
router.post('/user/login', login);

router.post('/:userId/project', createProject);
router.get('/:userId/:projectId/project', projectView);
router.get('/:projectId/:userId/projectInfo', auth, projectInfo); // to view project in application
// to get the project information for single usage like just reading it
router.get('/:projectId/projectInfo', auth, projInfo); // just reading proj info
router.patch('/:pid/:uid/interest', indicateInterest);
router.patch('/:pid/:uid/removeInterest', removeInterest);

// updating user profile information
router.patch('/:userId/userInfo', auth, updateInfo);
router.get('/:userId/userData', auth, userData);

router.patch('/:userId/updatePass', updatePass);
router.patch('/:projectId/project', auth, projectUpdate);

// getting the user projects
router.get('/:userId/myProjects', auth, myProjects);

router.get('/:userId/signedIn', auth, isLoggedIn);
router.get('/projects', getAllProjects);

// router.get('/',fetchAllProprietors);

// router.post('/:userId/uploadPlanFile', upload.single('planFile'), planFileUpload);
router.patch('/:projectId/uploadPlanFile', planFileUpload);

//
router.delete('/:projectId/project', auth, deleteProject);
router.delete('/:planId/plan', deletePlan);

router.get('/project', searchProject);

// only for admin
router.get('/admin/users', allUsers);

//tesst
router.get('/test', testOne);
router.get('/:id/token', refreshToken);
router.get('/:id/logout', auth, logout);

export default router;
