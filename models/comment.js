const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
   username:{type: String,requird:true},  
   comment:{type:String,requird:true}  
},{timestamps : true});

const Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;