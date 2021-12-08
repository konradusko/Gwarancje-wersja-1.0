import express from "express"
const before_auth_POST_register = express.Router()
import {register} from "../../modules/before_auth/register.js"
import {fetch_photo} from "../../modules/global/promise_fetch_photo.js"
// const {register} = require('../../modules/before_auth/register')
before_auth_POST_register.post('/registerUser',async(req,res)=>{ 
    const name_minimum_length = 4,name_max_length = 25,password_minimum_length = 6,password_max_length = 25
    const validate_avatar = res.locals.avatar_info
    const reg = async (photo)=>{
        try {
            await register({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                avatar:photo,
                public_avatar:validate_avatar.avatars_register
            })
            return res.json({message:"Konto zostało utworzone ! Możesz się zalogować"})
        } catch (error) {
            return res.json({message:error})
        }
    }
    if(!("name" in req.body) ||!("password" in req.body)||!("email" in req.body)||!("avatar" in req.body))
       return res.json({message:"Brak wszystkich danych"})

    if(!(typeof req.body.name ==='string'))
    return res.json({message:'Nazwa musi być typem string.'})
    if(!(typeof req.body.password ==='string'))
    return res.json({message:'Hasło musi być typem string.'})
    if(!(typeof req.body.email ==='string'))
    return res.json({message:'Email musi być typem string.'})
    
    if(req.body.name.length <name_minimum_length && req.body.name.length <=name_max_length)
       return res.json({message:"Nazwa użytkownika powinna zawierać od 4 do 25 znaków !"})

    if(req.body.password.length < password_minimum_length)
       return res.json({message:"Hasło powinno zawierać co najmniej 6 znaków !"})
    if(req.body.password.length > password_max_length)
        return res.json({message:'Haslo nie może być dłuższe niz 25 znaków.'})
    const reg_exp_mail_validate =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const validate_email = reg_exp_mail_validate.test(String(req.body.email).toLowerCase()) == true? true:false
    if(!validate_email)
        return res.json({message:"Email jest zły !"})
    if(req.body.avatar == 1 || req.body.avatar == 2|| req.body.avatar == 3 || req.body.avatar == '1' || req.body.avatar == '2'|| req.body.avatar == '3'){
        reg(req.body.avatar)
    }else{
        try {
            const photo = await fetch_photo(req.body.avatar)
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
    }
  
   
 
})
export {before_auth_POST_register}