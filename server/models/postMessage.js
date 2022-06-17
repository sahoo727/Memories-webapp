import mongoose from "mongoose";

const postSchema = mongoose.Schema({        //to define the schema of database
    title: String,
    message:String,                         //feildname : type
    creator:String,
    tags:[String],                          //[ ] - this tells that its array
    selectedFile:String,
    likeCount:{                             // { } - here we include inside currly braces bcz we are defining type and also some other factor also in same feildname
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default: new Date()
    },

});

const PostMessage = mongoose.model('PostMessage',postSchema);

export default PostMessage;