import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  name:{type:String,required:true}, email:String, phone:String, specialty:String, qualification:String,
  departmentId:{type:mongoose.Schema.Types.ObjectId,ref:'Department',required:true},
  consultationFee:{type:Number,default:0}, slotMinutes:{type:Number,default:15},
  dailyCapacity:{type:Number,default:30}, status:{type:String,default:'active'}
},{timestamps:true});
export default mongoose.model('Doctor',schema);
