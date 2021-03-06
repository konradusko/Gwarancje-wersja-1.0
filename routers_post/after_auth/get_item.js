import express from "express"
const get_item = express.Router()
import {get_item_info_by_id} from '../../modules/global/get_item_info_by_id.js'
import {create_obj_with_tokens_files} from '../../modules/global/create_obj_with_tokens_files.js'
import {create_avatar_obj_with_tokens} from '../../modules/global/create_avatar_obj_with_tokens.js'
import {validate_body_keys_without_return} from '../../modules/global/validate_body_keys.js'
get_item.post('/getItem',async (req,res)=>{

    const minutes_for_token_photo_avatar = res.locals.minutes_for_avatar_token//potem to z configa wziac
    const minutes_for_token_photo_files = res.locals.minutes_for_files_token
    const uid = res.locals.user.uid
    const item_id = res.locals.item_id
    let item_to_send = {
        events:[],
        files:[],
        avatar:{}
    }
    let tmp;
    try {
        const require_to_validate = ['token','public_id_item']
        const allow_to_pass = []
        await validate_body_keys_without_return({body:req.body,require_to_validate,allow_to_pass})
        try {
            const item_value = await get_item_info_by_id({id:item_id,action:"whole_item",collection_name:'Items'})

            if(item_value.events.length != 0)
            for(let _=0;_<item_value.events;_++){
                try {//pobieram info i eventach
                    tmp = await get_item_info_by_id({id:item_value.events[_],action:"event_front",collection_name:'Events'})
                    if(tmp.added_by == uid)
                    item_to_send.events.push({
                        public_id:tmp.public_id,
                        name:tmp.name,
                        date_of_event:tmp.date_of_event
                    })
               
                    
                   
                } catch (error) {
                    return res.json({message:'Nie udało się pobrać przedmiotu'})
                }
    
            }
    
            
                item_to_send.avatar = await create_avatar_obj_with_tokens({avatar:item_value.avatar,minutes:minutes_for_token_photo_avatar})
                if(item_value.files.length !=0)
                    item_to_send.files = await create_obj_with_tokens_files({array_of_items:item_value.files,minutes:minutes_for_token_photo_files})
    
                item_to_send.data = item_value.data
                return res.json({message:"udało sie pobrac przedmiot",data:item_to_send})
    
        } catch (error) {
            console.log(error)
            return res.json({message:'Nie udało się pobrać przedmiotu'})
        }
    } catch (error) {
        return res.json({message:error})
    }
  
})
export{get_item}