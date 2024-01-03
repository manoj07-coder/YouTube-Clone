import { errorHandler } from "../error.js"
import User from "../models/User.js"
import Video from "../models/Video.js"


export const updateUser = async (req,res,next)=>{
   if(req.params.id === req.user.id){
      try {
         const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
            },{
               new:true
            }
         )
         res.status(200).json(updatedUser)
      } catch (error) {
         next(err)
      }
   }else{
      return next(errorHandler(403,'You can update only your own account'))
   }
}

export const deleteUser = async (req,res,next)=>{
   if(req.params.id === req.user.id){
      try {
         await User.findByIdAndDelete(req.params.id)
         res.status(200).json('User deleted successfully')
      } catch (error) {
         next(error)
      }
   }else{
      return next(errorHandler(403,'You can delete only your account'))
   }
}

export const getUser = async(req,res,next)=>{
   try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user)
   } catch (error) {
      next(err)
   }
}
export const subcribe =async (req,res,next)=>{
   try {
      await User.findByIdAndUpdate(req.user.id,{ $push:{subscribedUsers:req.params.id}});
      await User.findByIdAndUpdate(req.params.id,{
         $inc:{subscribers:1},
      })
     res.status(200).json('Subscription successful')
   } catch (error) {
      next(error)
   }
}
export const unSubcribe =async (req,res,next)=>{
   try {
      await User.findByIdAndUpdate(req.user.id,{
         $pull:{subscribedUsers:req.params.id},
      })
      await User.findByIdAndUpdate(req.params.id,{
         $inc:{subscribers:-1}
      })
      res.status(200).json('Unsubscription successful')
   } catch (error) {
      next(error)
   }
}
export const like = async(req,res,next)=>{
   const id = req.user.id;
   const videoId = req.params.videoId;
   try {
      await Video.findByIdAndUpdate(videoId,{
         $addToSet:{likes:id},
         $pull:{dislikes:id}
      })
      res.status(200).json('Video has been liked')
   } catch (error) {
      next(error)
   }
}
export const dislike = async (req,res,next)=>{
   const id = req.user.id;
   const videoId = req.params.videoId;
   try {
      await Video.findByIdAndUpdate(videoId,{
         $addToSet:{dislikes:id},
         $pull:{likes:id}
      })
      res.status(200).json('Video has been disliked')
   } catch (error) {
      next(error)
   }
}

