const express=require('express');
const router=express.Router();
const {userById, isAuth}=require('../controller/auth')
const {createNote , noteById, update, remove , noteByCategory, read ,liked, noteForUser} = require('../controller/note')


router.post('/create/:userId',isAuth,createNote);


router.put('/update/:userId/:noteId',isAuth,update);
router.delete('/remove/:userId/:noteId',isAuth,remove);
router.post('/search/category',noteByCategory);
router.get('/notes',read);
router.get('/incLike/:noteId',liked);
router.get('/userNote/:userId',isAuth,noteForUser)


router.get('/getnote/:noteId',(req,res)=>{
    res.json({
        user:req.note
    })
})


router.param('noteId',noteById);
router.param('userId',userById);


module.exports=router