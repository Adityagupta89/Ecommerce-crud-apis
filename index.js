const express=require('express');
const app=express();
const mongoose=require('mongoose')
const user_routes=require('./routes/users')
app.use(express.json())
app.use('/api/user/',user_routes)
const db_url =
  "mongodb+srv://aditya_gupta89:1234@cluster0.8r6bxyw.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db_url)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));
let port =process.env.Port||3000
app.listen(port,()=>console.log(`Listening to the port - ${port} `))