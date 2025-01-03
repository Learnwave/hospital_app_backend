import bycrypt from "bcrypt"
import { v2 as cloudinary } from "cloudinary";

import jwt from "jsonwebtoken"

//api for adding doctors

import validator from "validator";
import doctorModel from "../models/doctorModel.js";

const addDoctor = async (req,res) =>{

    try {
        const {name,email,password,speciality,degree,experience,about,fees,address} = req.body;
        const imageFile = req.file
        console.log({name,email,password,speciality,degree,experience,about,fees,address});
        
        
        //checking for all data in form
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({success:false,message:"Missing Details"})
        }
       
        //validating email format

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})

        }

        //validating a strong password

        if (password.length < 8 ) {
            return res.json({success:false,message:"Please enter a strong password"})
        }
        
        //hashing doctor password
        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password,salt)
        
        //upload image to cloudinary
        const imageUload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl = imageUload.secure_url

        const doctorData = {
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()

            
        }


        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save()
        
        
        return res.json({success:true,message:"Doctor Added To Database"})

        
    } catch (error) {
        console.error(error)
        return res.json({success:false,message:error.message})
    }
}

//api for the admin login

const loginAdmin = async (req,res) => {
    
        try {
            const {email,password} = req.body;
            
            
            if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
                const token = jwt.sign(email+password,process.env.JWT_SECRET);

                res.json({success:true,token})
            }else{
                res.json({success:false,message:"invalid credentials"})
            }

        } catch (error) {
            console.error(error)
            res.json({success:false,message:error.message})
        }
}
//api to get all doctor list

const allDoctor = async (req,res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true,doctors});
    } catch (error) {
        console.error(error)
        res.json({success:false,message:error.message})
    }
}

export {addDoctor,loginAdmin,allDoctor}