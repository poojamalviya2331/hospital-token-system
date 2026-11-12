import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
export async function listAppointments(req,res){
 const filter={}; if(req.query.date){const d=new Date(req.query.date);const e=new Date(d);e.setDate(e.getDate()+1);filter.scheduledAt={$gte:d,$lt:e};}
 if(req.query.status)filter.status=req.query.status;
 const items=await Appointment.find(filter).populate('patientId','uhid name phone').populate('doctorId','name specialty').populate('departmentId','name').sort({scheduledAt:1}).limit(300);
 res.json({items});
}
export async function createAppointment(req,res){
 const {patientId,doctorId,scheduledAt,reason,source='phone'}=req.body;
 if(!patientId||!doctorId||!scheduledAt)return res.status(400).json({message:'Patient, doctor and appointment date are required'});
 const doctor=await Doctor.findById(doctorId);if(!doctor||doctor.status!=='active')return res.status(404).json({message:'Doctor not found'});
 const when=new Date(scheduledAt);if(Number.isNaN(when.getTime())||when<new Date())return res.status(400).json({message:'Choose a valid future date and time'});
 const start=new Date(when);start.setHours(0,0,0,0);const end=new Date(start);end.setDate(end.getDate()+1);
 const count=await Appointment.countDocuments({doctorId,scheduledAt:{$gte:start,$lt:end},status:{$nin:['Cancelled','No-show']}});
 if(count>=doctor.dailyCapacity)return res.status(409).json({message:'Doctor schedule is full for this date'});
 const appt=await Appointment.create({patientId,doctorId,departmentId:doctor.departmentId,scheduledAt:when,reason,source,createdBy:req.user._id,appointmentNo:`APT-${Date.now()}`});
 res.status(201).json({appointment:appt});
}
export async function updateAppointmentStatus(req,res){
 const allowed=['Confirmed','Checked-in','In Queue','In Consultation','Completed','Cancelled','No-show'];
 if(!allowed.includes(req.body.status))return res.status(400).json({message:'Invalid appointment status'});
 const item=await Appointment.findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true});
 if(!item)return res.status(404).json({message:'Appointment not found'});res.json({appointment:item});
}
