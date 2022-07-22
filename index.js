const express=require('express');
const app=express();
const mongoose=require('mongoose')
const user_routes=
require('./routes/users')
app.use(express.json())
app.use('/api/user/',user_routes)
const {DB,PORT}=require('./config/index')
mongoose.connect(DB)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log(err));

app.listen(PORT,()=>console.log(`Listening to the port - ${PORT} `))