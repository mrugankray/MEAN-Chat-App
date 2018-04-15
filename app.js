const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const passport=require('passport');
const path=require('path');
const mongoose=require('mongoose');
const config=require('./config/database');
const app=express();
const users=require('./routes/users');
const port=process.env.PORT||8080;
var multer = require('multer');
const User=require('./models/user');
const dataset=require('./models/dataset');
//app.use(express.static(path.join(__dirname,'uploaded_pics')));

// let savePath1 = '';
//connect to the database
mongoose.connect(config.database);

//check if connencted to database
mongoose.connection.on('connected',()=>{
    console.log('connected to database'+config.database);
})

//on error
mongoose.connection.on('error',(err)=>{
    console.log('error while connecting to database'+err);
});
/*
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
*/
//cors middleware
app.use(cors());

//static path
app.use(express.static(path.join(__dirname,'public')));

//body-parser middleware
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:false}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//users route
app.use('/users',users);

//listening on port 8080
app.get('/',(req,res)=>{
    res.send('hello world')
});

//wild card
/*app.get('**',(req,res)=>{
    res.sendfile(path.join(__dirname,'public/index.html'));
});*/
//multer
/* app.post("/users/upload", multer({dest: "./uploaded_pics/"}).array("uploads[]", 12), function(req, res) {
    res.send(req.files);
});
*/
let storage = multer.diskStorage({
    // destination
    destination: function (req, file, cb) {
      cb(null, './uploaded_pics/')
    },
    filename: function (req, file, cb) {
        let datetimestamp = new Date;
        cb(null, file.originalname );
        /* + '-' + datetimestamp 
        + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]*/
        /*this.savePath1 = './uploaded_pics/'+file.originalname + '-' + datetimestamp 
        + '.' 
        + file.originalname.split('.')[file.originalname.split('.').length -1];
        */
    }
  });
let upload = multer({ storage: storage });

app.post("/users/upload", upload.array("uploads[]",12), (req, res)=>{
    res.send(req.files);
    console.log(req.body);
    let user_details = JSON.parse(req.body.user_data);
    //user_details.bio = JSON.parse(req.body.newUserBio);
    console.log(user_details);
    console.log('new email: '+req.body.newUserEmail+' bio: '+req.body.newUserBio);
    console.log('userId of the user is: '+user_details.userId);
    console.log('Name of the user is: '+user_details.name); 
    console.log('files',req.files);
    const savePath = /*'../'+*/req.files[0].path;
    const newUserBio = req.body.newUserBio;
    const newUserEmail = req.body.newUserEmail;
    //console.log(savePath);
    /*if(err){
        console.log('The error is: '+err);
    } else {*/
        User.findById(user_details.userId,(err,user_details)=>{
            let user = user_details;
            user.image = savePath;
            user.email = newUserEmail;
            user.bio = newUserBio;
            user.save((err)=>{
                if(err){
                    console.log('saving failed');
                    // res.json({success:false,msg:'failed to save file',status:'500'});
                } else {
                    console.log('save successful');
                    // res.json({success:true,msg:'file saved',status:'200'});
                }
            });
        });
     //}
});

//start server

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});