import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";


// in every block we will have try and catch blocks
export const getPosts = async (req, res) => {           //since await is async action
    try{
        const postMessages = await PostMessage.find();  //await is used bcz finding is a time taking process

        res.status(200).json(postMessages);
    }catch (error){
        res.status(404).json({ message : error.message});
    }
}

export const createPost = async(req,res) => {
    const post = req.body;
    const newPost = new PostMessage(post);

    try{
        await newPost.save();

        res.status(201).json(newPost);
    }catch(error) {
        res.status(409).json({message:error.message});
    }
}

export const updatePost = async(req,res) => {
    const { id: _id } = req.params;                 // : _id - we used this to rename id to _id
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatePost = await PostMessage.findByIdAndUpdate(_id, post,{new: true} )         // 1st parameter will be the element we need then 2nd will be entire post, then we write new : true so that we recive the real update version of the post
    res.json(updatePost);
}