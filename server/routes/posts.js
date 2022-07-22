import express from "express";

import { createPost, getPosts, updatePost, deletePost, likePost } from "../contollers/post.js"; //in node.js specifying the extensions is necessary

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost)

export default router;