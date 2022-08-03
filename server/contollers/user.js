import bcrypt from 'bcrypt';                  //this to stored the passwords hashed and safe
import jwt from 'jsonwebtoken';                 //to store user credentials in the browser safely for some peroid of time so that they stay looged in


import User from '../models/user.js';

export const signin = async(req, res) => {
    const { email, password } = req.body;       //from req.body we get json response from which we are taking email and password

    try {
        const existingUser = await User.findOne({email});

        if(!existingUser)
            return res.status(404).json({ message : ' User dosent exist '});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect)
            return res.status(400).json({message : ' Invalid Credentials '});
        
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', {expiresIn: '1h'});

        res.status(200).json({result: existingUser, token });

    } catch (error) {
        res.status(500).json({message: 'Something went wrong '});

    }
}

export const signup = async(req, res) => {
    const {email, password, confirmPassword, firstName, lastName} = req.body;

    try {
        const existingUser = await User.findOne({email});

        if(existingUser)
            return res.status(400).json({ message : ' User already exists '});

        if(password !== confirmPassword)
            return res.status(400).json({ message : ' Passwords dosent match '});

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`});
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', {expiresIn: '1h'});

        res.status(200).json({result, token});

    } catch (error) {
        res.status(500).json({message: 'Something went wrong '});
        
    }
}
