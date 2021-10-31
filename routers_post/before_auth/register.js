import express from "express"
const before_auth_POST_register = express.Router()
import {register} from "../../modules/before_auth/register.js"
import {fetch_photo} from "../../modules/before_auth/promise_fetch_photo.js"
// const {register} = require('../../modules/before_auth/register')
before_auth_POST_register.post('/registerUser',async(req,res)=>{ 
    if(!("name" in req.body) ||!("password" in req.body)||!("email" in req.body)||!("img" in req.body))
       return res.json({message:"Brak wszystkich danych"})

    if(req.body.name.length <4 && req.body.name.length <=25)
       return res.json({message:"Nazwa użytkownika powinna zawierać od 4 do 25 znaków !"})

    if(req.body.password.length < 6)
       return res.json({message:"Hasło powinno zawierać co najmniej 6 znaków !"})
    
    const reg_exp_mail_validate =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const validate_email = reg_exp_mail_validate.test(String(req.body.email).toLowerCase()) == true? true:false
    if(!validate_email)
        return res.json({message:"Email jest zły !"})
    const photo = await fetch_photo(req.body.img)
    const max_size = 2100000 // bajty
    if(photo.type == "image/jpeg" || photo.type == "image/png"||photo.type == "image/jpg"){}else{
        return res.json({message:"Zdjęcie ma zły format !"})
    }
    if(photo.size > max_size)
        return res.json({message:"Zdjęcie jest za duże !"})
    try {
        await register({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            img:photo
        })
        return res.json({message:"Konto zostało utworzone ! Możesz się zalogować"})
    } catch (error) {
        return res.json({message:error})
    }
 
})
export {before_auth_POST_register}