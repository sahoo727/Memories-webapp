import mongoose from "mongoose";

const postSchema = mongoose.Schema({        //to define the schema of database
    title: String,
    message:String,                         //feildname : type
    name: String,
    creator:String,
    tags:[String],                          //[ ] - this tells that its array
    selectedFile:String,
    likes:{                             // { } - here we include inside currly braces bcz we are defining type and also some other factor also in same feildname
        type:[String],
        default:[]
    },
    comments: {type: [String], default: []},
    createdAt:{
        type:Date,
        default: new Date()
    },

});

const PostMessage = mongoose.model('PostMessage',postSchema);

export default PostMessage;