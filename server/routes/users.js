import express from "express";

import { signin, signup } from "../contollers/user.js"; //in node.js specifying the extensions is necessary

const router = express.Router();

router.post('/signin',signin);
router.post('/signup',signup);

export default router;