import express from "express"
const get_all_items = express.Router()
import {get_user_info_from_db} from '../../modules/after_auth/get_users_info.js'
import {get_item_info_by_id} from '../../modules/global/get_item_info_by_id.js'
import {create_avatar_obj_with_tokens} from '../../modules/global/create_avatar_obj_with_tokens.js'
import {validate_body_keys_without_return} from '../../modules/global/validate_body_keys.js'
get_all_items.post('/getAllItems',async(req,res)=>{
    const uid = res.locals.user.uid;
    const minutes_for_token_photo = res.locals.minutes_for_avatar_token
    try {
        const require_to_validate = ['token']
        const allow_to_pass = []
        await validate_body_keys_without_return({body:req.body,require_to_validate,allow_to_pass})
        try {
            const {items} = await get_user_info_from_db({uid:uid,type:"items"})
            //pobrac wszystkie przedmioty
            let ready_items = []
            for(let _=0;_<items.length;_++){
                try {
                    const {
                        avatar,
                        item_name,
                        date_start,
                        date_end,
                        public_id
                    } = await get_item_info_by_id({id:items[_].stringValue,action:"home_data",collection_name:'Items'})
                    ready_items.push({avatar,item_name,date_start,date_end,public_id})
                } catch (error) {}
            }
            //teraz tworze tokeny do zdjęcia
            for(let __ =0;__<ready_items.length;__++){
             ready_items[__].avatar  = await create_avatar_obj_with_tokens({avatar:ready_items[__].avatar,minutes:minutes_for_token_photo})
            }
            return res.json({message:'Udało się pobrać produkty',data:ready_items})
        } catch (error) {
            console.log(error)
            return res.json({messsage:'Nie udało się pobrać produktów'})
        }
    } catch (error) {
            return res.json({message:error})
    }

})
export{get_all_items}