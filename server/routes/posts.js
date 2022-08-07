import express from "express";

import { createPost, getPosts, updatePost, deletePost, likePost, getPostsBySearch } from "../contollers/post.js"; //in node.js specifying the extensions is necessary
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;