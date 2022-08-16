import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";


// in every block we will have try and catch blocks
export const getPosts = async (req, res) => {           //since await is async action
    const {page} = req.query;
    try{
        const LIMIT = 8;
        const startIndex = (Number(page) - 1)*LIMIT;
        const total = await PostMessage.countDocuments({})
        const posts = await PostMessage.find().sort({_id : -1}).limit(LIMIT).skip(startIndex);  //await is used bcz finding is a time taking process

        res.status(200).json({data : posts, currentPage : Number(page), numberOfPages : Math.ceil(total/LIMIT) });
    }catch (error){
        res.status(404).json({ message : error.message});
    }
}

export const getPost = async(req,res) => {
    const {id} = req.params;
    try {
        const post = await PostMessage.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).juson({message : error.message});
    }
}

export const getPostsBySearch = async(req, res) => {
    const {searchQuery, tags} = req.query;
    try {
        const title = new RegExp(searchQuery, 'i');
        const posts = await PostMessage.find({ $or: [{title}, {tags: {$in: tags.split(',')}}]});

        res.json({data: posts});
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createPost = async(req,res) => {
    const post = req.body;
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});

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

export const deletePost = async(req,res) => {
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    
    await PostMessage.findByIdAndRemove(id);
    
    res.json({message : 'Post deleted Successfully'})
}

export const likePost = async(req,res) => {
    const {id} = req.params;
    
    if(!req.userId) return res.json({message : 'Unauthenticated'})
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1){
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const likePost = await PostMessage.findByIdAndUpdate(id, post, {new : true});

    res.json(likePost);
}

export const commentPost = async(req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostMessage.findById(id);
    post.comments.push(value);
    const updatePost = await PostMessage.findByIdAndUpdate(id, post, { new: true});
    res.json(updatePost)
}