import express  from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(bodyParser.json({limit:"30mb" , extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb" , extended:true}));
app.use(cors());

app.use('/posts' , postRoutes); // routes should comes below the cors and not above
app.use('/user', userRoutes);
const PORT = process.env.PORT || 443;

app.get('/', (req, res) => {
    res.send('APP IS RUNNING');
})

mongoose.connect(process.env.CONNECTION_URL , {useNewUrlParser : true, useUnifiedTopology : true})
    .then(() => app.listen(PORT, () => console.log(`server running on port ${PORT}`)))
    .catch((error) => console.log(error.message));

// mongoose.set('useFindAndModify',false);