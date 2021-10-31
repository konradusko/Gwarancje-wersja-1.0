import express from "express"
const get_user_info = express.Router()

get_user_info.post('/getUserInfo',async(req,res)=>{ 
    // console.log(req.body)
    console.log(res.locals.user,'to')
})
export {get_user_info}