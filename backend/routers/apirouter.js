const router=require('express').Router()
const authC=require('../controllers/authcontroller')

router.post('/signup',authC.signup)

router.post('/login',authC.login)



module.exports=router