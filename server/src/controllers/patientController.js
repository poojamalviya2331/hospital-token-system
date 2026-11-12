import Patient from '../models/Patient.js';
export async function listPatients(req,res){
 const page=Math.max(1,Number(req.query.page)||1), limit=Math.min(100,Math.max(1,Number(req.query.limit)||10));
 const q=(req.query.q||'').trim();
 const filter=q?{$or:[{name:{$regex:q,$options:'i'}},{phone:{$regex:q,$options:'i'}},{uhid:{$regex:q,$options:'i'}}]}:{};
 const [items,total]=await Promise.all([Patient.find(filter).sort({createdAt:-1}).skip((page-1)*limit).limit(limit),Patient.countDocuments(filter)]);
 res.json({items,total,page,limit});
}
export async function createPatient(req,res){
 const count=await Patient.countDocuments();
 const patient=await Patient.create({...req.body,uhid:req.body.uhid||`HSP${String(Date.now()).slice(-8)}`});
 res.status(201).json({patient});
}
export async function getPatient(req,res){const p=await Patient.findById(req.params.id);if(!p)return res.status(404).json({message:'Patient not found'});res.json({patient:p});}
export async function updatePatient(req,res){const p=await Patient.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});if(!p)return res.status(404).json({message:'Patient not found'});res.json({patient:p});}
