import Token from '../models/Token.js';
import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';
const dateKeyFor=(d)=>{const x=new Date(d);return `${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}-${String(x.getDate()).padStart(2,'0')}`;};
export async function liveQueue(req,res){
 const dateKey=req.query.date||dateKeyFor(new Date());
 const filter={dateKey};if(req.query.doctorId)filter.doctorId=req.query.doctorId;
 const items=await Token.find(filter).populate('patientId','name uhid').populate('doctorId','name').populate('departmentId','name').sort({sequence:1});
 res.json({items});
}
export async function checkIn(req,res){
 const {patientId,doctorId,appointmentId,priority='normal'}=req.body;
 if(!patientId||!doctorId)return res.status(400).json({message:'Patient and doctor are required'});
 const [patient,doctor]=await Promise.all([Patient.findById(patientId),Doctor.findById(doctorId)]);
 if(!patient||!doctor)return res.status(404).json({message:'Patient or doctor not found'});
 const dateKey=dateKeyFor(new Date());const queueKey=`${doctorId}`;
 const active=await Token.findOne({patientId,doctorId,dateKey,status:{$in:['Waiting','Called','In Consultation','On Hold']}});
 if(active)return res.status(409).json({message:'Patient already has an active token today',token:active});
 // Atomic counter document is used to avoid duplicate sequence assignment.
 const Counter=(await import('../models/Counter.js')).default;
 const counter=await Counter.findOneAndUpdate({key:`${queueKey}:${dateKey}`},{$inc:{value:1}},{new:true,upsert:true});
 const token=await Token.create({tokenNo:`T${String(counter.value).padStart(3,'0')}`,sequence:counter.value,queueKey,patientId,doctorId,departmentId:doctor.departmentId,dateKey,appointmentId,priority});
 if(appointmentId)await Appointment.findByIdAndUpdate(appointmentId,{status:'In Queue'});
 req.app.get('io').to(`doctor:${doctorId}`).emit('queue:token-created',{tokenId:token._id,tokenNo:token.tokenNo,status:token.status});
 res.status(201).json({token});
}
export async function queueAction(req,res){
 const actions={call:{status:'Called',calledAt:new Date()},recall:{status:'Called',calledAt:new Date()},hold:{status:'On Hold'},skip:{status:'Skipped'},start:{status:'In Consultation',startedAt:new Date()},complete:{status:'Completed',completedAt:new Date()}};
 const update=actions[req.params.action];if(!update)return res.status(400).json({message:'Unsupported queue action'});
 const token=await Token.findByIdAndUpdate(req.params.tokenId,update,{new:true});
 if(!token)return res.status(404).json({message:'Token not found'});
 req.app.get('io').to(`doctor:${token.doctorId}`).emit('queue:token-status-changed',{tokenId:token._id,status:token.status,tokenNo:token.tokenNo});
 res.json({token});
}
