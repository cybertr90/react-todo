import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv/config';
import cors from 'cors'
import AuthRoute from './routes/AuthRoute.js'
import TodoRoute from './routes/ToDoRoute.js'
import cookieParser from 'cookie-parser';

const app = express()

//DATABASE CONNECTION AND START APP

mongoose
.connect(process.env.DB_URI)
.then(() => {
    app.listen(5000, () => console.log("http://localhost:5000"))
})
.catch(error => console.log(error))

//CONFIGURATION

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URI,

}));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

//ROUTES
app.use(TodoRoute);

app.use(AuthRoute)
