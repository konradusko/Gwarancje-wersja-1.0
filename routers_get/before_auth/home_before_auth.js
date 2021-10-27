import express from 'express';
const before_auth_home = express.Router()
import {isUserAuthorization} from "../../modules/global/validate.js"
before_auth_home.get('/',(req,res)=>{
    //tutaj jesli user jest nie zalogowany to z całymi sliderami sie pojawi
    res.render('auth.ejs', {
        template: '/'
    })
})
before_auth_home.post('/',(req,res)=>{
    const page = '/before_auth/home.ejs'
    isUserAuthorization(req,res,page,false)
})
export {before_auth_home}
