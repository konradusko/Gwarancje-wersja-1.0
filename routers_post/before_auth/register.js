import express from "express"
const before_auth_POST_register = express.Router()
import {register} from "../../modules/before_auth/register.js"
import {fetch_photo} from "../../modules/global/promise_fetch_photo.js"
// const {register} = require('../../modules/before_auth/register')
before_auth_POST_register.post('/registerUser',async(req,res)=>{ 
    const name_minimum_length = 4,name_max_length = 25,password_minimum_length = 6
    const reg = async (photo)=>{
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
    }
    if(!("name" in req.body) ||!("password" in req.body)||!("email" in req.body)||!("img" in req.body))
       return res.json({message:"Brak wszystkich danych"})

    if(req.body.name.length <name_minimum_length && req.body.name.length <=name_max_length)
       return res.json({message:"Nazwa użytkownika powinna zawierać od 4 do 25 znaków !"})

    if(req.body.password.length < password_minimum_length)
       return res.json({message:"Hasło powinno zawierać co najmniej 6 znaków !"})
    
    const reg_exp_mail_validate =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const validate_email = reg_exp_mail_validate.test(String(req.body.email).toLowerCase()) == true? true:false
    if(!validate_email)
        return res.json({message:"Email jest zły !"})
    if(req.body.img != 1 || req.body.img != 2|| req.body.img != 3){
        try {
            const photo = await fetch_photo(req.body.img)
            const max_size =res.locals.max_size_file // bajty
            if(photo.type == "image/jpeg" || photo.type == "image/png"||photo.type == "image/jpg"){}else{
                return res.json({message:"Zdjęcie ma zły format !"})
            }
            if(photo.size > max_size)
                return res.json({message:"Zdjęcie jest za duże !"})
            reg(photo)
        } catch (error) {
            return res.json({message:"Plik ma zły format lub jest uszkodzony!"})
        }
      
    }else{
        reg(req.body.img)
    }
  
   
 
})
export {before_auth_POST_register}