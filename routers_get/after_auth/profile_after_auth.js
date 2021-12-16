import express from 'express'
const after_auth_profil = express.Router()
import {isUserAuthorization} from "../../modules/global/validate.js"
after_auth_profil.get('/profil',(req,res)=>{
    res.render('auth.ejs', {
        template: '/profil'
    })
})
after_auth_profil.post('/profil',(req,res)=>{
    const page = '/after_auth/profil.ejs'
    const javascirpt = "./after_auth/main_profil.js"
    isUserAuthorization(req,res,page,true,javascirpt)
})
export {after_auth_profil}