import express from "express"
const before_auth_register = express.Router()
import {isUserAuthorization} from "../../modules/global/validate.js"
before_auth_register.get('/register',(req,res)=>{
    //tutaj sama rejestracja
    res.render('auth.ejs', {
        template: '/register'
    })
})
before_auth_register.post('/register',(req,res)=>{
    const page = '/before_auth/register.ejs'
    const javascript = "./before_auth/main_register.js"
    isUserAuthorization(req,res,page,false,javascript)
})
export {before_auth_register}
