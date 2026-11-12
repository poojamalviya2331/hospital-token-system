import mongoose from 'mongoose';
const schema = new mongoose.Schema({name:{type:String,required:true,unique:true},code:String,description:String,status:{type:String,default:'active'}},{timestamps:true});
export default mongoose.model('Department',schema);
