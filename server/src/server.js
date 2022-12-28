import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

// starting db connection
import dbserver from '../src/db/database.js';
dbserver();

const app = express()

// importing various user routes
// registering the proprietor

// project route imported
import userRoutes from './user/routes/userRoutes.js'






// cors
app.use(cors())

// accepting post form data / parse form data from post
app.use(bodyParser.urlencoded({extended : false}))

// parse appllication/json data
app.use(bodyParser.json())

// using the proprietor routes
//app.use('/register', userRoutes);
app.use('/', userRoutes);

// using the project routes
//app.use('/:userId/project', userRoutes);

// Upload image
//app.use('/:userId/uploadFile', userRoutes)


export default app