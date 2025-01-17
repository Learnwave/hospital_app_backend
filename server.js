import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoutes.js';


//app config



const app = express();

const port = process.env.PORT || 4001

connectDb()
connectCloudinary()
//middle wares

app.use(express.json());
app.use(cors());

//api endpoints

app.use('/api/admin',adminRouter)


app.get('/',(req,res)=>{
        res.send("API WORKING")
})

app.listen(port,()=>{
    console.log("server started ",port);

})

