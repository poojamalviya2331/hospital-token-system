import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  uhid:{type:String,unique:true,index:true},
  name:{type:String,required:true,trim:true,index:true},
  dob:Date, age:Number, gender:{type:String,enum:['female','male','other','prefer_not_to_say']},
  phone:{type:String,required:true,index:true}, email:String, address:String,
  emergencyContact:String, guardian:String, status:{type:String,default:'active'}
},{timestamps:true});
schema.index({name:'text',phone:'text',uhid:'text'});
export default mongoose.model('Patient',schema);
