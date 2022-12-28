import mongoose from "mongoose";

import Person from "../models/userModel.js";




        
const allUsers =  async ( req, res) => {
    try{
        const users = await Person.find({});
        res.send(users);

    }catch(e){
        console.log(e)
    }
}

export default allUsers;