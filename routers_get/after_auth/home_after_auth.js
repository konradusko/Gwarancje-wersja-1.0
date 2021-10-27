import express from 'express'
const after_auth_home = express.Router()
import {isUserAuthorization} from "../../modules/global/validate.js"
after_auth_home.get('/home',(req,res)=>{
    res.render('auth.ejs', {
        template: '/home'
    })
})
after_auth_home.post('/home',(req,res)=>{
    const page = '/after_auth/home.ejs'
    const javascirpt = "./after_auth/main_home.js"
    isUserAuthorization(req,res,page,true,javascirpt)
})
export {after_auth_home}