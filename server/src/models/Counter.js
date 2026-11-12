import mongoose from 'mongoose';
export default mongoose.model('Counter',new mongoose.Schema({key:{type:String,unique:true},value:{type:Number,default:0}}));
