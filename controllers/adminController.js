



//api for adding doctors

const addDoctor = async (req,res) =>{

    try {
        const {name,email,password,speciality,degree,experience,about,fees,address} = req.body;
        const imageFile = req.file

        console.log({name,email,password,speciality,degree,experience,about,fees,address,file,},imageFile)
        
    } catch (error) {
        
    }
}

export {addDoctor}