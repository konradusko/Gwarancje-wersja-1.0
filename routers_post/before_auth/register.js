import express from "express"
const before_auth_POST_register = express.Router()
import {register} from "../../modules/before_auth/register.js"
import { isHtml } from "../../modules/global/is_html_in_text.js"
import {fetch_photo} from "../../modules/global/promise_fetch_photo.js"
import {check_photo_format} from '../../modules/validate_photo/check_photo_format.js'
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
    
    if(isHtml(req.body.name))
        return res.json({message:'Nazwa zawiera niedozwolone znaki.'})
    
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
        if(!(typeof req.body.avatar === 'string'))
            return res.json('Avatar ma zły format')
        if(isHtml(req.body.avatar))
            return res.json('Avatar zawiera niedozwolone znaki.')
        try {
            const photo = await fetch_photo(req.body.avatar)
            const type_of_photo = await check_photo_format(photo)
            console.log(type_of_photo)
            const max_size =res.locals.max_size_file // bajty
            if( type_of_photo == "image/png"||type_of_photo == "image/jpg"){}else{
                return res.json({message:"Zdjęcie ma zły format !"})
            }
            if(photo.size > max_size)
                return res.json({message:"Zdjęcie jest za duże !"})
            reg({blob:photo,type:type_of_photo})
        } catch (error) {
            return res.json({message:"Plik ma zły format lub jest uszkodzony!"})
        }
    }
  
   
 
})
export {before_auth_POST_register}