// import OpenAI from 'openai';
// import 'dotenv/config';

// const client = new OpenAI({
//   baseURL: 'https://openrouter.ai/api/v1',
//   apiKey: process.env.OPENROUTER_API_KEY,
// });

// const response = await client.chat.completions.create({
//   model: 'moonshotai/kimi-k2:free',
//   messages: [
//     {
//       role: 'user',
//       content: 'what is python?'
//     }
//   ]
// });

// console.log(response.choices[0].message.content);


import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import UserRoutes from "./routes/user.js"
import cookieParser from "cookie-parser";
 

const app = express();
const PORT = 8080;

app.use(express.json());
// app.use(cors());
// app.use(cors({
//   origin: "http://localhost:5173",  
//   credentials: true                 
// }));


const allowedOrigins = [
  "http://localhost:5173", // local development
  "https://chatbot-web-3-4ufs.onrender.com", // deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));


app.use(cookieParser());


app.use("/api" , chatRoutes);
 app.use("/api" , UserRoutes);

app.listen(PORT , ()=>{
  console.log(`server running on ${PORT}`);
  connectDB();
});

const connectDB = async()=>{
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected with database");
  }
  catch(err){
    console.log(err);
  }
}


 
 
