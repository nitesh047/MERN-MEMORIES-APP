import mongoose from 'mongoose';
import PostMesaage from "../models/postMessage.js";

export const getPosts= async (req,res)=>{
    try {
        const postMessage = await PostMesaage.find();
        res.status(200).json(postMessage);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const createPost =async (req,res)=>{
    const post = req.body; 
    const newPost = new PostMesaage(post);

    try {
       await newPost.save();
       res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message:error.message});
    }
}

export const updatePost = async (req,res) =>{
    const { id: _id } = req.params;
    const post = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = await PostMesaage.findByIdAndUpdate(_id, {...post,_id}, { new: true });


    res.json(updatedPost);
}

export const deletePost = async (req,res) =>{
    const {id}= req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    await PostMesaage.findByIdAndRemove(id);
     
    res.json({message:'Post Deleted Successfully'});

}

export const likePost = async (req,res) =>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const post = await PostMesaage.findById(id);
    const updatedPost = await PostMesaage.findByIdAndUpdate(id, {likeCount : post.likeCount +1},{new: true});
 
    res.json(updatedPost);
}