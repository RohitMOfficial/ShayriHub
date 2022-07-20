const express=require('express');
const router=express.Router();
const {signup , signin ,userById, isAuth, userByEmail}=require('../controller/auth')


router.post('/signup',signup)
router.post('/signin',signin)
router.post('/byemail',userByEmail);
router.get('/getinfo/:userId',isAuth,(req,res)=>{
    console.log("checking here", req.profile)
    res.json({
        user:
            req.profile
    })
})






router.param('userId',userById);

module.exports=router