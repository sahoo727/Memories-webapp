import express from "express";

import { getPosts } from "../contollers/post.js"; //in node.js specifying the extensions is necessary

const router = express.Router();

router.get('/', getPosts)

export default router;