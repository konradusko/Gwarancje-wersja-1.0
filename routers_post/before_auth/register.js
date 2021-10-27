import express from "express"
const before_auth_POST_register = express.Router()
import {register} from "../../modules/before_auth/register.js"
// const {register} = require('../../modules/before_auth/register')
// const {fetch }= require('node-fetch')
before_auth_POST_register.post('/registerUser',async(req,res)=>{
    // console.log(req.body)
    
    console.log('wyzej request body')
    console.log(req.body.imgToSend)

    // fetch(req.body.imgToSend)
    // .then(res=>res.blob())
    // .then(console.log)
    // try {
    //    const result = await register({
    //         name:req.body.name,
    //         email:req.body.email,
    //         password:req.body.password
    //     })
    // } catch (error) {
        
    // }
 
})
export {before_auth_POST_register}