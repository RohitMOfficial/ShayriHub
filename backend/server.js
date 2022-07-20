const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');
const Path=require('path')



require('dotenv').config()

const root=process.env.ROOT;
const DB=process.env.DATABASE;


const authRouter=require('./Router/auth');
const noteRouter=require('./Router/note')




mongoose.connect(DB,{
    useNewUrlParser:true
}).then(()=>{
    console.log("connected to DB");
}).catch(err=>{
    console.log(err);
})

//middleware
app.use(cors())
app.use(bodyParser.json())


app.use('/api',authRouter);
app.use('/api',noteRouter);












// --------------deployment------------
// __dirname=Path.resolve();














app.listen(root,()=>{
    console.log("app is running at ",root);
})