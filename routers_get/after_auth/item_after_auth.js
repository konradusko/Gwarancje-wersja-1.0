import express from 'express'
const item_after_auth = express.Router()
import {isUserAuthorization} from "../../modules/global/validate.js"
item_after_auth.get('/item',(req,res)=>{
    res.render('auth.ejs', {
        template: '/item'
    })
})
item_after_auth.post('/item',(req,res)=>{
    const page = '/after_auth/item.ejs'
    const javascirpt = "./after_auth/main_item.js"
    isUserAuthorization(req,res,page,true,javascirpt)
})
export {item_after_auth}