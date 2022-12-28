import mongoose from "mongoose";

const planSchema = mongoose.Schema({
    ownerID : {
        type : mongoose.SchemaTypes.ObjectId, ref : 'Proprietor'
    },
    projectID : { 
        type : mongoose.SchemaTypes.ObjectId, ref : 'Project',
        require : true
     },
    name : {
        type: String,
        require : true
    },
    file:{
        data: Buffer,
        contentType : String
    }
})

const planModel = mongoose.model('Project_plan', planSchema);

export default planModel;