import mongoose from "mongoose";
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { errorHandler } from "../error.js";
import jwt from "jsonwebtoken";

export const signUp = async (req,res,next)=>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password,salt);
        const newUser = new User({...req.body,password:hashedPassword})
        await newUser.save();
        res.status(200).json('User has been created')
    } catch (error) {
        next(error)
    }
}

export const signIn = async (req,res,next)=>{
    try {
        const user = await User.findOne({name:req.body.name});
        if(!user){
            return next(errorHandler(404,'User not found'));
        }
        const isPassword = await bcrypt.compare(req.body.password,user.password);
        if(!isPassword){
            return next(errorHandler(400,'Wrong credentials'))
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

        const {password,...rest} = user._doc

        res.cookie('access_token',token,{
            httpOnly:true,
        }).status(200).json(rest)
    } catch (error) {
        next(error);
    }
}