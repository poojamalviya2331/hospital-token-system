import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  tokenNo:{type:String,required:true}, sequence:{type:Number,required:true},
  queueKey:{type:String,required:true}, patientId:{type:mongoose.Schema.Types.ObjectId,ref:'Patient',required:true},
  appointmentId:{type:mongoose.Schema.Types.ObjectId,ref:'Appointment'},
  doctorId:{type:mongoose.Schema.Types.ObjectId,ref:'Doctor',required:true},
  departmentId:{type:mongoose.Schema.Types.ObjectId,ref:'Department',required:true},
  dateKey:{type:String,required:true}, status:{type:String,enum:['Waiting','Called','In Consultation','On Hold','Skipped','Completed','Transferred'],default:'Waiting'},
  priority:{type:String,enum:['normal','priority','emergency'],default:'normal'},
  calledAt:Date, startedAt:Date, completedAt:Date
},{timestamps:true});
schema.index({queueKey:1,dateKey:1,sequence:1},{unique:true});
schema.index({patientId:1,doctorId:1,dateKey:1,status:1});
export default mongoose.model('Token',schema);
