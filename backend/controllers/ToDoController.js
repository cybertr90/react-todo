import {Todo} from '../models/Todo.js'
export const getTodo = async (req,res) => {
    /* const {id} = req.body; */
    
    const list = await Todo.find({ user_id: "6617fddb8b0761ae110b57d1" });
    if(list) return res.json(list);
    
    else return res.send({empty: "No data."});
}

export const getTodoById = async (req,res) => {
    const {todoId} = req.params;
    console.log(todoId);
    res.send(todoId)
}