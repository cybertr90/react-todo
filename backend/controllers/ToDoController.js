import e from 'express';
import {Todo} from '../models/Todo.js'
import { User } from '../models/User.js';
export const getTodo = async (req,res) => {
    const {id} = req.query; 
    //console.log(id)
    const list = await Todo.find({ user_id: id });
    console.log(list)
    if(list) return res.json(list);
    else return res.send({empty: "No data."});
}

export const getTodoById = async (req,res) => {
    const {todoId} = req.params;

    const todoOne =  await Todo.findById(todoId);

    res.json(todoOne)
}

export const deleteFromId = async (req,res) => {
    const {id} = req.params

    await Todo.deleteOne({_id : id})
    
    return res.send("success + deleteResp")
    
    
}
export const addTodo = async (req,res) => {
    const {title, content, user_id} = req.body
    
    if(title && content && user_id)
    {
        await Todo.create({
            title,
            content,
            user_id
        });

        return res.send({success: "Successfully added !"});
    }
    else return res.send({error: "Fields are required."});
  
}
export const changeTodo = async (req,res) => {
    try {
        const {id, title, content} = req.body;
    await Todo.updateOne({_id : id}, {$set: {title, content}});
    
    return res.send({success: "Changed Successfully"});
    } catch (error) {
        console.log(error)
    }

}