import { User } from "../models/User.js";
import { hashPassword, verifyPassword } from "../helpers/crypt.js";
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  const { username, password, verify_password } = req.body;
  if (!username || !password || !verify_password)
    return res.json({ error: "Fields are required." });

  if (password != verify_password)
    return res.json({ error: "Passwords must be same." });

  const user = await User.findOne({ username });

  if (user) return res.json({ error: "User already exists." });

  await User.create({
    username,
    password: hashPassword(password),
  });

  return res.json({ success: "Register Successful" });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) 
    return res.json({ error: "Fields are required." });

  const user = await User.findOne({ username });

  if (user && verifyPassword(password, user.password)){
    jwt.sign({username, password: user.password, id: user._id}, process.env.JWT_SECRET, {}, (err,token) => {
        if(err) throw err;
        res.cookie('jwt_token',token);
        res.send({success: "Login Successful"})
    });
    

  }
  else return res.json({ error: "Invalid Credentials." });
};

export const getUser = (req,res) => {

    const {jwt_token} = req.cookies;
    if(jwt_token)
     {
        jwt.verify(jwt_token, process.env.JWT_SECRET, {}, (err,user) => {
            if(err) throw err;

            return res.send(user);
        })
     }
     else return res.send(null);
    
}

export const logout = (req,res) => {
  res.clearCookie("jwt_token")
  res.send("asdasda");
}