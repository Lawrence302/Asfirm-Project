import express from 'express';
import multer from 'multer';
import path from 'path';
import planModel from '../models/planModel.js';
import Project from '../models/projectModel.js';

// making __filname and __dirname available to us since we are using es6 module and type is set to module
/* import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); */

// console.log('this is the parth of the file start point ', __dirname)
/// downloads part for debugging
//  import fi from  '../../'
////
/////
//////
//////

// route to upload plan file
const planFileUpload = async (req, res) => {
  // deleting existing plan for this project if it already has one
  try {
    const existingProject = await Project.findById(req.params.projectId);

    if (!existingProject) {
      return res.status(404).send({ error: 'project not found ' });
    }

    // if (existingProject.plan) {
    //   return res.send('plan exists for this project already');
    // }

    // console.log('project found');
    const project = await Project.findByIdAndUpdate(
      { _id: req.params.projectId },
      { plan: req.body.plan },
      { new: true }
    );

    res.status(200).send(project);
  } catch (e) {
    res.status(500).send(e);
  }

  // getting the files and determining the location route and unique file name
  /*  const Storage = multer.diskStorage({
        destination : './src/public/uploads/files',
        filename: (req , file , cb ) => {
            const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, uniqueName + '-' + file.originalname );
        }
    })
*/
  // uploading the file to multer storage
  /*  const upload = multer({
        dest : './src/public/uploads/files',
        // storage : storage value above
        storage : Storage
    }).single('project_plan')

    */
  /*  upload(req,res, async (err) => {

            try{
                // console.log('\n\n length ', req.file.size / 1024)
                if(err){
                    console.log(err)
                }else{
                    // deleting existing plan for this project if it already has one
                    const existingPlan = await planModel.findOne( { projectID : req.params.projectId})
                    
                    if(existingPlan){
                        console.log('project found')
                        await planModel.findOneAndDelete( { projectID : req.params.projectId})
                        
                    }



                    // stroing the file record in database
                    const newPlan = await  new planModel({
                        owner: req.params.userId,
                        projectID : req.params.projectId,
                        name : req.file.originalname,
                        file :{
                            data: req.file.filename,
                            contentType : 'application/pdf'
                        }
                    })

                    // adding pland id to project 
                    const updateProject = await Project.findOneAndUpdate({ _id : newPlan.projectID}, {plan : newPlan._id});
                    // console.log(planproj, "\n\n\n this new plan: id ", planproj.plan)

                    await newPlan.save();

                    res.send({status: 'upload successfull', opject : newPlan})
                }
            }
            catch(e){
                res.send(e);
            }
        }) */
};

export default planFileUpload;
