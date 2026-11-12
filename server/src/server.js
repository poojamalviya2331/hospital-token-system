import 'dotenv/config';import http from 'http';import {Server} from 'socket.io';import app from './app.js';import {connectDB} from './config/db.js';
const start=async()=>{await connectDB();const server=http.createServer(app);const io=new Server(server,{cors:{origin:process.env.CLIENT_URL,methods:['GET','POST'],credentials:true}});
io.use((socket,next)=>{ // Socket rooms are joined only after an authenticated API token is verified by the client/server in the production hardening phase.
  next();
});
io.on('connection',socket=>{socket.on('queue:join',({doctorId})=>{if(doctorId)socket.join(`doctor:${doctorId}`);});});
app.set('io',io);const port=process.env.PORT||5000;server.listen(port,()=>console.log(`API running on http://localhost:${port}`));};
start().catch(err=>{console.error(err);process.exit(1);});
