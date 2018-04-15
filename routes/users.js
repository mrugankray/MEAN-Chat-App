const express=require('express');
const app=express();
const router=express.Router();
const jwt=require('jsonwebtoken');
const passport=require('passport');
const User=require('../models/user');
const config=require('../config/database');
const dataset=require('../models/dataset');
const mongoose=require('mongoose');
const path=require('path');

app.use(express.static(path.join(__dirname,'uploaded_pics')));
//app.use('../uploaded_pics',express.static(__dirname+'../uploaded_pics'));
//register
router.post('/sign_up',(req,res,next)=>{
    let newUser=new User({
        name:req.body.name,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password 
    });
    User.addUser(newUser,(err,user)=>{
        if(err){
            res.json({success:false,msg:'failed to register'});
        }
        else{
            res.json({success:true,msg:'Registered successfully'});
        }
    });
});


//authenticate
router.post('/authenticate',(req,res,next)=>{
    //const email=req.body.email;
    const username=req.body.username;
    const password=req.body.password;
    /*User.getUserByEmail(email,(err,user)=>{
        if(err) throw err;
        if(!user) {
            res.json({success:false,msg:'user not found'});
        }*/
        User.getUserByUsername(username,(err,user)=>{
            if(err) throw err;
            if(!user){
                return res.json({success:false,msg:'User not found'});
            }
        User.comparePassword(password,user.password,(err,isMatch)=>{
            if(err) throw err;
            if(isMatch) {
                const token=jwt.sign({data: user},config.secret,{expiresIn:86400});
                res.json({
                    success:true,
                    token:'JWT '+token,
                    user:{
                        userId:user._id,
                        name:user.name,
                        email:user.email,
                        username:user.username,
                        image:user.image
                    }
                });
            } else {
                res.json({success:false,msg:'wrong password'});
            }
        });
    }); 
});

//edit profile
// router.post('/upload',multipartmiddleware,profile_controller.updatePhoto);
//profie
router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    res.send({user:req.user});
    //console.log({user:req.user})
});
module.exports=router;

//Tweets
router.post('/chat',(req,res,next)=>{
    // res.send(req.body);
    console.log(req.body);
    let user_details = JSON.parse(req.body.user_data);
    //user_details.bio = JSON.parse(req.body.newUserBio);
    console.log(user_details);
    console.log('userId of the user is: '+user_details.userId);
    console.log('Name of the user is: '+user_details.name); 
    //console.log('userId of the user is: '+user_details.userId);
    //console.log('Name of the user is: '+user_details.name); 
    //const userWithPosts = new dataset(user_details);
    const tweet = req.body.tweet;
    //const now = new Date;
    const date = new Date;
    /*const date = now.getUTCFullYear() + '/' + (now.getUTCMonth() + 1 ) + '/' +
    now.getUTCDate();*/
    //const day = now.getUTCHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    console.log('new tweet: '+req.body.tweet);
    let userWithPosts = new dataset(user_details);
    userWithPosts.tweet = tweet;
    userWithPosts.date = date;
    //userWithPosts.day = day;
    //userWithPosts.save();
    let saveSuccessful=false;
    userWithPosts.save((err)=>{
        if(err){
            console.log('saving failed');
            res.json({success:false,msg:'failed to save file',status:'500',err:err});
        } else {
            console.log('save successful');
            //saveSuccessful = !saveSuccessful;
            //return true;
            // res.json({success:true,msg:'file saved',status:'200'});
            dataset.posts((err,posts)=>{
                if(err) {
                    console.log(err);
                    res.json({success:false,msg:'unable to find any posts',err:err});
                    // res.send(err);
                } else {
                    //res.json({success:true,msg:'fetched the posts',posts:posts});
                      res.send(posts);
                      //console.log(posts);
                    //console.log(posts);  
                }
            });
        }
    });
    //console.log(userWithPosts);
    //console.log(saveSuccessful); 
    //console.log(userWithPosts.save());    

    //userWithPosts.tweet = tweet;
    //console.log(userWithPosts);
    /*dataset.findById(user_details.userId,(err,user_details)=>{
        let userWithPosts = user_details; 
        console.log(userWithPosts);
        userWithPosts.tweet = tweet;
        console.log(userWithPosts);
       userWithPosts.save((err)=>{
            if(err){
                console.log('saving failed');
                console.log(err);
                // res.json({success:false,msg:'failed to save file',status:'500'});
            } else {
                console.log('save successful');
                // res.json({success:true,msg:'file saved',status:'200'});
            }
      });

    dataset.posts((err,posts)=>{
          if(err) {
              console.log(err);
              // res.json({success:false,msg:'unable to find any posts'});
              res.error(err);
          } else {
                 // res.json({success:true,msg:'fetched the posts'});
                  res.json(posts);
          }
      });
    });*/
});

router.get('/getPosts',(req,res,next)=>{
    dataset.posts((err,posts)=>{
        if(err) {
            res.json({success:false,msg:'unable to find any posts',err:err});
        } else {
            res.send(posts);
            res.json({success:true,msg:'got all the posts',posts:posts});
        }
    }); 
});

module.exports=router;