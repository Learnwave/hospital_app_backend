import jwt from "jsonwebtoken"

//admin authentication middleware

const authAdmin = async (req,res,next) => {
        try {
            
            const {atoken} = req.headers
            if (!atoken) {
                return res.json({success:false,message:"not auth login again"})
            }
            const tokenDecode = jwt.verify(atoken,process.env.JWT_SECRET,)
            if (tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
                return res.json({success:false,message:"not auth login again"})
            }

            next()

        } catch (error) {
            console.error(error)
            return res.json({success:false,message:error.message})
        }
}

export default authAdmin