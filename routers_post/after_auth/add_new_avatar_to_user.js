import express from "express"
const add_new_avatar_to_userPOSTREQ = express.Router()
import {remove_file} from '../../modules/global/remove_file_in_storage.js'
import {get_user_info_from_db} from "../../modules/after_auth/get_users_info.js"
import {add_new_avatar} from '../../modules/after_auth/add_new_avatar.js'
import {makeId} from '../../modules/global/makeId.js'
import {check_avatar_type} from '../../modules/after_auth/check_avatar.js'
import {check_format_and_add_avatar} from '../../modules/after_auth/add_avatar_to_db_pre_functions.js'
import {validate_body_keys_without_return} from '../../modules/global/validate_body_keys.js'
import { isHtml } from "../../modules/global/is_html_in_text.js"

add_new_avatar_to_userPOSTREQ.post('/addNewAvatarUser',async(req,res)=>{
    const uid = res.locals.user.uid;
    const max_size = res.locals.max_size_file // bajty
    const avatar_info_validate = res.locals.avatar_info
    const add_avatar = async(blob)=>{
        try {
            const path = `UsersPhotos/${uid}/`
           const avatar_to_add =  await check_format_and_add_avatar({obj:blob,path})//dodajemy zdj do storage
           try {
                await add_new_avatar({uid:uid,avatar:avatar_to_add,collection:'Users'})
                return res.json({message:"Avatar zostal zmieniony."})
           } catch (error) {
               await remove_file(avatar_to_add.path)
               return res.json({message:"Nie udało się dodać avataru."})
           }
        } catch (error) {
            return res.json({message:"Nie udało się dodać avataru."})
        }
    }

    try {
        const require_to_validate = ['public_id_item','token']
        const allow_to_pass = ['avatar','avatar_id']
        await validate_body_keys_without_return({body:req.body,require_to_validate,allow_to_pass})
        //sprawdzam czy jest avatar_i czy ew ma odpowiedni format i rozmiar
        const is_avatar =  await check_avatar_type({body:req.body,allow_format:avatar_info_validate.allow_format,max_size:max_size})
        if(is_avatar === null)
        return res.json({message:'Brakuje avataru.'})
        if('avatar_id' in req.body && typeof req.body.avatar_id === 'string' && isHtml(req.body.avatar_id))
        return res.json({message:'Avatar zawiera niedozwolone znaki.'})
        if('avatar_id' in req.body && typeof req.body.avatar_id === 'string'){
            try {
                const {avatar} = await get_user_info_from_db({uid:uid,type:"avatar"})
                if(avatar.avatar_id != req.body.avatar_id)
                return res.json({message:"Nie istnieje taki avatar."})
    
                if(avatar.avatar_public === true)
                    add_avatar(is_avatar)//jest publiczne to aby dodajemy 
                
    
                if(avatar.avatar_public != true){
                    //japierw dodam jako publiczne
                    const public_avatar = { // publiczny avatar
                        path:avatar_info_validate.public_avatar.path,
                        id:await makeId(20),
                        type:avatar_info_validate.public_avatar.type,
                        public:true
                    }
                    //najpierw trzeba usunac stary
                    try {
                        await add_new_avatar({uid:uid,avatar:public_avatar,collection:'Users'})
                        await remove_file(avatar.avatar_path)
                        add_avatar(is_avatar)
                    } catch (error) {
                        return res.json({message:'Nie udało się dodać avatara'})
                    }
                }
            } catch (error) {
                return res.json({message:"Coś poszło nie tak."})
            }
        }else{
            return res.json({message:"Brakuje id avataru lub jest ono nie poprawne."})

        }
    
    } catch (error) {
        return res.json({message:error})
    }
    
})

export{add_new_avatar_to_userPOSTREQ}