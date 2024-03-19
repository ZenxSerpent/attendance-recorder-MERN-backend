const mongoose=require("mongoose")

const statusSchema=mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    isPresent:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
})

const Status=mongoose.model("Status",statusSchema)
module.exports=Status