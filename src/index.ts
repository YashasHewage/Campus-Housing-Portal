import express from 'express'
import { config } from 'dotenv';
config();
import  mongoose from 'mongoose';

const PORT = process.env.PORT
const mongoDBURL = process.env.mongoDBURL


const app = express()

app.get('/', (req, res) => {
  res.status(200);
  res.send('Hello World!')
})

const connectDB = async () => {

  try {
    const conn = await mongoose.connect(mongoDBURL)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  }
  catch (error) {
    console.log(error)
  
  }
}

export default connectDB;
  
