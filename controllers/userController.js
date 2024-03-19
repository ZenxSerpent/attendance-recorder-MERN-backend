const User = require("../model/userModel")
const jwt=require("jsonwebtoken")

const loginController=async(req,res)=>{

    const {name,password}=req.body
    const us=await User.findOne({name})
    if (us && (await us.matchPassword(password))) {

        res.json({
            _id:us._id,
            name:us.name,
            email:us.email,
            designation:us.designation,
            token:us.generateToken(us._id)
        })
    }else{
        res.status(401).send({err:"user not found"})
    }
    
    
}

const adminAdderController=async(req,res)=>{
    const {name,email,password,designation}=req.body

    if(req.user.designation==='admin'){
        if(!name || !email || !password || !designation ){
            res.send('required feilds are empty')
        }
    
        const userExist=await User.findOne({email})
        if(userExist){
            return res.send({msg:"user email exists"})
        }
        
        const us=await User.create({
            name,
            email,
            password,
            designation
        })
    
        if(us){
            res.send({msg:`${us.name} added successfully`})
        }else{
            res.status(401).send({err:"failed to add"})
        }


    }else{
        res.status(401).send({err:"unauthorised"})
    }

    
    }

    const adminFetchAllController=async(req,res)=>{
        if(req.user.designation==='admin'){
            try {
                const data=await User.find({ _id: { $ne: req.user._id } })
                res.send(data)
            } catch (error) {
                res.send({err:"unable to fetch"})
            }
        }else{
            res.status(401).send({err:"unauthorised"})
        }
        
    }

    const adminRemoveController=async(req,res)=>{
        const{id}=req.body
        if(req.user.designation==='admin'){
            try {
                const data=await User.deleteOne({ _id: id })
                res.send({msg:'user deleted successfully'})
            } catch (error) {
                res.send({err:"unable to delete"})
            }
        }else{
            res.status(401).send({err:"unauthorised"})
        }
    }



module.exports={loginController,adminAdderController,adminFetchAllController,adminRemoveController}