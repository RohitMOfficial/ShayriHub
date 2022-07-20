const notes=require('../model/notes')
const _=require('lodash');
const { ObjectId } = require('mongodb');


exports.createNote=(req,res)=>{
    let newnote={
        email:req.profile.email,
        title:req.body.title,
        description:req.body.description,
        category:req.body.category,
    }
    let n=new notes(newnote);
    console.log(newnote)
    n.save((err,user)=>{
        if(err){
            return res.status(400).json({
                msg:{
                    success:false,
                    error:err
                }
            })
        }
        res.json({
            msg:{
                success:true,
                data:user
            }
        })
    })

}

exports.noteById=(req,res,next,id)=>{
    notes.findById(id,(err,note)=>{
        if(err || !note){
            return res.status(400).json({
                error:"No note with this id"
            })
        }
        req.note=note;
        console.log(req.note);
        next();
    })
}

exports.remove=(req,res)=>{
    let _id=req.note._id;
    // _id=_id.toHexString();
    console.log(_id)
    notes.remove({_id:ObjectId(_id)},(err,data)=>{
        if(err){
            return res.status(400).json({
                msg:{
                    success:false,
                    error:err
                }
            })
        }
        res.json({
            msg:{
                success:true,
                info:"Note removed successfully" 
            }
        })
    })
   
}

exports.noteByCategory=(req,res)=>{
    let search=req.body.category;
    
    notes.find({"category":{$regex:search}},(err,data)=>{
        if(err){
            return res.status(400).json({
                msg:{
                    success:false,
                    error:"No data"
                }
            })
        }
        res.json({
            msg:{
                success:true,
                data:data
            }
        })
    })
}

exports.noteForUser=(req,res)=>{
    let email=req.profile.email;
    notes.find({"email":email},(err,note)=>{
        if(err || !note){
            return res.status(400).json({
                msg:{
                    success:false,
                    error:"You have not any shayri, Please create New "
                }
            })
        }
        res.json({
            msg:{
                success:true,
                data:note
            }
        })
    })
}

exports.read=(req,res)=>{
    notes.find((err,data)=>{
        if(err || !data){
            return res.status(400).json({
                msg:{
                    success:false,
                    error:"No shayri found"
                }
            })
        }
        console.log(data)
        res.json({
            msg:{
                success:true,
                data:data
            }
        })
    })
}


exports.update=(req,res)=>{
    let notedata=req.note;
    const data=req.body;

    notedata=_.extend(notedata,data);
    console.log("thsi is in update method",notedata)
    console.log("this is extended data of updation",notedata);
    notedata.save((err,note)=>{
        if(err){
            return res.status(400).json({
                msg:{
                    success:false,
                    error:"Not Updated, Try again"
                }
            })
        }
        console.log(note)
        res.json({
            msg:{
                success:true,
                note:note
            }
        })
    })
    
}

exports.liked=(req,res)=>{
    let notedata=req.note;
    let newlikes=notedata.like+1;
    let newlikeobj={
        "like":newlikes
    }
    notedata=_.extend(notedata,newlikeobj);
    notedata.save((err,note)=>{
        if(err){
            return res.status(400).json({
                error:"Not updated due to some error, try again"
            })
        }
        res.json({
            msg:{
                success:true,
                note:note
            }
        })
    })
}
