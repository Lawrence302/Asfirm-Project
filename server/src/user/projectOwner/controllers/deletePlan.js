
import Project from "../models/projectModel.js";
import planModel from "../models/planModel.js";

const deletePlan = async (req, res) => {
    const id = req.params.planId

    try{

    
        const plan = await planModel.findById(id)

        if(!plan){
            return res.status(404).send('not found')
        }

        const proj = await Project.findById(plan.projectID)

        if(proj){
            await Project.findByIdAndUpdate( plan.projectID , {$unset : { plan : 1 }} , {new : true})
        }

            await planModel.findByIdAndDelete(id)




        res.send()

    }catch(e){
        res.status(400).send()
    }
}

export default deletePlan;