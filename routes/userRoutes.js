
const express=require("express")
const { loginController,adminAdderController, adminFetchAllController, adminRemoveController } = require("../controllers/userController")
const protect= require("../middleware/authware")
const { fetchAttendanceController, putAttendanceController } = require("../controllers/attendanceController")


const Router=express.Router()

Router.route('/').get(protect,(req,res)=>{res.send('homepage')})
Router.route('/login').post(loginController)
Router.route('/adminAdder').post(protect,adminAdderController)
Router.route('/adminRemover').post(protect,adminRemoveController)
Router.route('/fetchAttendance').post(protect,fetchAttendanceController)
Router.route('/putAttendance').put(protect,putAttendanceController)
Router.route('/adminFetchAll').get(protect,adminFetchAllController)



module.exports=Router