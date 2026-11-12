import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name:{type:String,required:true,trim:true},
  email:{type:String,required:true,unique:true,lowercase:true,trim:true},
  passwordHash:{type:String,required:true},
  role:{type:String,enum:['super_admin','hospital_admin','receptionist','doctor','nurse','cashier','patient','lab_staff'],default:'receptionist'},
  status:{type:String,enum:['active','inactive'],default:'active'},
  lastLoginAt:Date
},{timestamps:true});
export default mongoose.model('User',userSchema);
