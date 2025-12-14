const express = require('express')
const app=express()
const cors = require("cors");
require('dotenv').config()
require('./dbconfiguration/dbconfig')

app.use(cors({
  origin: ['http://localhost:3000'], 
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
}));
app.use(express.json())
const apiRouter=require('./routers/apirouter')
const postRouter=require('./routers/postrouter')
const userRouter=require('./routers/userrouter')


app.use('/auth',apiRouter)
app.use('/posts',postRouter)
app.use('/users',userRouter)
app.listen(process.env.PORT,()=>{console.log(`Server is Running on Port ${process.env.PORT}`)})