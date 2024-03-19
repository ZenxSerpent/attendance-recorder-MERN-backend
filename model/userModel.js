const mongoose=require("mongoose")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const userSchema=mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   },
   designation:{
    type:String,
    required:true
   }
})

userSchema.methods.generateToken=function(id){
   return jwt.sign({id},process.env.SECREAT_KEY)
}
userSchema.methods.matchPassword=async function(pass){
   return await bcrypt.compare(pass,this.password)
  
}
userSchema.pre('save',async function (next){
   if(!this.isModified('password')){
       next()
   }
   const salt= await bcrypt.genSalt(10)
   this.password=await bcrypt.hash(this.password,salt)
})
const User=mongoose.model("User",userSchema)
module.exports=User