const signup=require('../model/signup');
const jwt=require('jsonwebtoken');

const errorHandler=require('../helper/dbErrorHandler')




exports.signup=(req,res)=>{
    const user=new signup(req.body);
    user.save((err,user)=>{
        if(err){
           let key=err.keyValue;
            
            return res.status(401).json({
                msg:{
                    success:false,
                    error:key
                }
            })
        }
        res.json({
            msg:{
                success:true,
                body:user
            }
        })
    })
}

exports.signin=(req,res)=>{
    let emailId=req.body.email;
    signup.findOne({email:emailId},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                msg:{
                    success:false,
                    error:"no user with this email id, try again"
                }
            })
        }
        if(user.password!==req.body.password){
            return res.status(400).json({
                msg:{
                    success:false,
                    error:"Wrong password"
                }
            })
        }
        let userid={_id:user._id};
        console.log(user);
        console.log(process.env.SECURITY_KEY)
        let token=jwt.sign(userid,process.env.SECURITY_KEY);
        res.cookie('t',token);
        res.json({
            msg:{
                success:true,
                user:user,
                token:token
            }
        })
    });

}

exports.userByEmail=(req,res)=>{
    let email=req.body.email;
    console.log(email)
    signup.findOne({"email":email},(err,data)=>{
        if(err){
            return res.status(400).json({
                msg:{
                    success:false,
                    error:"no user find with this email"
                }
            })

        }
        res.json({
            msg:{
                success:true,
                user:data
            }
        })
    })
}

exports.userById=(req,res,next,id)=>{
    console.log(id);
    signup.findById(id,(err,user)=>{
        if(err || !user){
            
            return res.status(400).json({
                msg:{
                    success:false,
                    error:"No user with this Id"
                }
            })
        }

        console.log("this is profile user",user)
        req.profile=user;
        next();
    })
}
exports.isAuth=(req,res,next)=>{
    console.log("here");
    const Bearer=req.header('authorization');
    if(Bearer){
        const bearerArray=Bearer.split(' ');
        const token=bearerArray[1];
        
        jwt.verify(token,process.env.SECURITY_KEY,(err,user)=>{
            
            
            if(err){
                console.log("inside the error");
               return  res.status(401).json({
                    msg:{
                        success:false,
                        error:"Unauthorized User"
                    }
                })
            }
           let obj=req.profile._id;
           let newId=obj.toHexString();
           
            
            
            
            if(user._id!==newId){
               return res.status(401).json({
                    msg:{
                        success:false,
                        error:"Not a authorized user"
                    }
                })
            }
            
            next();
        });
    }
    else{
        return res.status(401).json({
            msg:"invalid user"
        
        })
        next();

}

}



