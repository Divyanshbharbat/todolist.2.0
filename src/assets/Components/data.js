import mongoose from 'mongoose'
const Schema=mongoose.Schema({
    time:String,
    work:String,
    createat:String,
})
const model=mongoose.model("model",Schema)
export default model