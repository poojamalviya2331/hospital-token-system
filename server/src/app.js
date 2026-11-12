import express from 'express';import cors from 'cors';import helmet from 'helmet';import morgan from 'morgan';import rateLimit from 'express-rate-limit';
import api from './routes/api.js';import {notFound,errorHandler} from './middleware/errors.js';
const app=express();
app.use(helmet());app.use(cors({origin:process.env.CLIENT_URL,credentials:true}));app.use(express.json({limit:'1mb'}));app.use(morgan('dev'));
app.use('/api/auth',rateLimit({windowMs:15*60*1000,max:30}));
app.get('/api/health',(req,res)=>res.json({status:'ok'}));app.use('/api',api);app.use(notFound);app.use(errorHandler);
export default app;
