import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import model from './data.js';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  
  },
  email: {
    type: String,
  
  },
  password: {
    type: String,

  },
  
    data:[
      
        {
          type:mongoose.Schema.Types.ObjectId,
          ref:"model"
        }
      
    ]
  
});
const User =mongoose.model("User",userSchema)
export default User