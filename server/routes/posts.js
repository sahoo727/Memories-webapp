import express from "express";

import { createPost, getPosts } from "../contollers/post.js"; //in node.js specifying the extensions is necessary

const router = express.Router();

router.get('/', getPosts);
router.post('/',createPost);

export default router;