import PostMessage from "../models/postMessage.js";

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