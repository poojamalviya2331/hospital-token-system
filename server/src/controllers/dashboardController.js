import Appointment from '../models/Appointment.js';
import Patient from '../models/Patient.js';
import Token from '../models/Token.js';
export async function summary(req,res){
 const start=new Date();start.setHours(0,0,0,0);const end=new Date(start);end.setDate(end.getDate()+1);
 const [appointments,checkedIn,waiting,inConsultation,completed,cancellations,totalPatients]=await Promise.all([
 Appointment.countDocuments({scheduledAt:{$gte:start,$lt:end}}),
 Appointment.countDocuments({scheduledAt:{$gte:start,$lt:end},status:'Checked-in'}),
 Token.countDocuments({dateKey:start.toLocaleDateString('en-CA'),status:'Waiting'}),
 Token.countDocuments({dateKey:start.toLocaleDateString('en-CA'),status:'In Consultation'}),
 Appointment.countDocuments({scheduledAt:{$gte:start,$lt:end},status:'Completed'}),
 Appointment.countDocuments({scheduledAt:{$gte:start,$lt:end},status:'Cancelled'}),
 Patient.countDocuments({status:'active'})
 ]);
 res.json({appointments,checkedIn,waiting,inConsultation,completed,cancellations,totalPatients});
}
