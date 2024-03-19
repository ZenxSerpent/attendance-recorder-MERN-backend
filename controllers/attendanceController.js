const User = require("../model/userModel")
const Status=require('../model/statusModel')

const fetchAttendanceController=async(req,res)=>{
    const {date}=req.body
    if(req.user.designation==='teacher'){
        try{
            var data=await Status.find({date},'-_id').populate({ path: 'student', options: { strictPopulate: false } ,select:'name'})


            if(data.length==0){
                const allStudents= await User.find({designation:"student"})
                const wait=allStudents.map(async(element) => {
                    await Status.create({
                        student:element._id,
                        isPresent:"e",
                        date
                    })
                });
                await Promise.all(wait);
                
                data = await Status.find({ date },'-_id').populate('student', 'name');
                res.send(data)
                
            }else{
                res.send(data)
            }

        }catch(err){
            res.send(err)
        }
        
    }else{
        res.status(401).send("unauthorised")
    }
}

const putAttendanceController=async(req,res)=>{
    const {entries,date}=req.body
    if(req.user.designation==='teacher'){
        try {
            for(let key in entries){
                const status=await Status.updateOne({student:key,date},{
                    $set:{isPresent:entries[key]}
                })
                
            }
           
            res.send({msg:"Attendance updated"})
        } catch (err) {
            res.send(err)
        }
    }else{
        res.status(401).send({err:"unauthorised"})
    }
}

module.exports={fetchAttendanceController,putAttendanceController}