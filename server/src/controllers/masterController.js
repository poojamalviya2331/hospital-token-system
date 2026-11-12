import Department from '../models/Department.js';
import Doctor from '../models/Doctor.js';
export async function departments(req,res){res.json({items:await Department.find({status:'active'}).sort('name')});}
export async function createDepartment(req,res){res.status(201).json({department:await Department.create(req.body)});}
export async function doctors(req,res){const filter={status:'active'};if(req.query.departmentId)filter.departmentId=req.query.departmentId;res.json({items:await Doctor.find(filter).populate('departmentId','name').sort('name')});}
export async function createDoctor(req,res){res.status(201).json({doctor:await Doctor.create(req.body)});}
