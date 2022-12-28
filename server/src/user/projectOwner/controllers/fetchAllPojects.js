import Project from '../models/projectModel.js';

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({});

    res.status(200).send(projects);
  } catch (e) {
    res.status(500).send(e);
  }
};

export default getAllProjects;

// with paggination
// const page = req.query.page;
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
