import express from "express"
const before_auth_login = express.Router()
import {isUserAuthorization} from "../../modules/global/validate.js"
before_auth_login.get('/login',(req,res)=>{
    //tutaj tylko do logowania
    res.render('auth.ejs', {
        template: '/login'
    })
})
before_auth_login.post('/login',(req,res)=>{
    const page = '/before_auth/login.ejs'
    const javascirpt = "./before_auth/main_login.js"
    isUserAuthorization(req,res,page,false,javascirpt)
})
export {before_auth_login}


