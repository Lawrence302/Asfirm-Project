import express from 'express';

import Project from '../models/projectModel.js';

// searching for projects
const searchProject = async (req, res) => {
  // console.log(`/${req.query.title}/`)
  // console.log(req.query);
  const term = req.query.term.toLowerCase();

  console.log(term, '.*' + term + '.*');

  try {
    const result = await Project.find({
      title: { $regex: '.*' + term + '.*' },
    });

    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e);
  }
};

export default searchProject;

//with paggination
// const searchProject = async ( req, res ) => {

//     // console.log(`/${req.query.title}/`)

//     const page = req.query.page;
//     const limit = req.query.limit;

//     try{

//         const startIndex = (page - 1) * limit
//         const endIndex = page * limit
//         // using pagination to display the result
//         const result = await Project.find(
//             { title : { $regex : '.*' + req.query.title + '.*'}}
//             ).limit(endIndex).skip(startIndex)

//         res.status(200).send(result)

//     }catch(e){
//         res.status(500).send(e)
//     }
// }
