import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  appointmentNo:{type:String,unique:true}, patientId:{type:mongoose.Schema.Types.ObjectId,ref:'Patient',required:true},
  doctorId:{type:mongoose.Schema.Types.ObjectId,ref:'Doctor',required:true},
  departmentId:{type:mongoose.Schema.Types.ObjectId,ref:'Department',required:true},
  scheduledAt:{type:Date,required:true}, source:{type:String,enum:['online','phone','walk_in'],default:'reception'},
  reason:String,status:{type:String,enum:['Booked','Confirmed','Checked-in','In Queue','In Consultation','Completed','Cancelled','No-show'],default:'Booked'},
  createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
},{timestamps:true});
schema.index({doctorId:1,scheduledAt:1,status:1});
export default mongoose.model('Appointment',schema);
