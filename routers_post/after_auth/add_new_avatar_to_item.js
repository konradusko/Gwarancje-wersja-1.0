import express from "express"
const add_new_avatar_to_itemPOSTREQ = express.Router()
import {check_avatar_type} from '../../modules/after_auth/check_avatar.js'
import {get_item_info_by_id} from '../../modules/global/get_item_info_by_id.js'
import { isHtml } from "../../modules/global/is_html_in_text.js"
import {validate_body_keys_without_return} from '../../modules/global/validate_body_keys.js'
import {makeId} from '../../modules/global/makeId.js'
add_new_avatar_to_itemPOSTREQ.post('/addNewAvatarItem',async(req,res)=>{
    const uid = res.locals.user.uid;
    const item_id = res.locals.item_id;
    const max_size = res.locals.max_size_file // bajty
    const avatar_info_validate = res.locals.avatar_info
    const add_avatar = async(blob)=>{
        try {
            const path = `Items/${item_id}/`
           const avatar_to_add =  await check_format_and_add_avatar({obj:blob,path})//dodajemy zdj do storage
           try {
                await add_new_avatar({uid:uid,avatar:avatar_to_add,collection:'Items'})
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
        //sprawdzam czy jest avatar_i czy ew ma odpowiedni format i rozmiar zwraca blob type
        const require_to_validate = ['public_id_item','token']
        const allow_to_pass = ['avatar','avatar_id']
        await validate_body_keys_without_return({body:req.body,require_to_validate,allow_to_pass})
        const is_avatar =  await check_avatar_type({body:req.body,allow_format:avatar_info_validate.allow_format,max_size:max_size})
        if(is_avatar === null)
        return res.json({message:'Brakuje avataru.'})

        if('avatar_id' in req.body && typeof req.body.avatar_id === 'string' && isHtml(req.body.avatar_id))
            return res.json({message:'Id zawiera niedozwolone znaki.'})
        if('avatar_id' in req.body && typeof req.body.avatar_id === 'string'){
            try {
                const {avatar} = await get_item_info_by_id({id:item_id,action:"avatar",collection_name:'Items'})
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
                        await add_new_avatar({uid:uid,avatar:public_avatar,collection:'Items'})
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
            return res.json({message:"Brakuje id avataru."})
        }
    
    } catch (error) {
        return res.json({message:error})
    }
    
})
export{add_new_avatar_to_itemPOSTREQ}