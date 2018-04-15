const mongoose=require('mongoose');
const config=require('../config/database');

const dataset = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    tweet:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    userId: {
        type:String,
        required:true
    },
    date: {
        type:Date,
        default:Date.now
    }
});
const DataSet = module.exports = mongoose.model('DataSet',dataset,'DataSets');

module.exports.posts = function(callback) {
    DataSet.find({}).sort({date: -1}).exec(callback);
}

module.exports.getUserById=function(id,callback) {
    DataSet.findById(id,callback);
}