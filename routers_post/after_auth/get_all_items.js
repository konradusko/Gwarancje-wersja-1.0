import express from "express"
const get_all_items = express.Router()
import {get_user_info_from_db} from '../../modules/after_auth/get_users_info.js'
import {get_item_info_by_id} from '../../modules/global/get_item_info_by_id.js'
import {create_token_photo} from "../../modules/global/access_token_photo.js"
get_all_items.post('/getAllItems',async(req,res)=>{
    const uid = res.locals.user.uid;
    const minutes_for_token_photo = 20
    try {
        const {items} = await get_user_info_from_db({uid:uid,type:"items"})
        //pobrac wszystkie przedmioty
        let ready_items = []
        for(let _=0;_<items.length;_++){
            try {
                const {
                    avatar_id,
                    avatar_path,
                    item_name,
                    date_start,
                    date_end,
                    public_id
                } = await get_item_info_by_id({id:items[_].stringValue,action:"home_data",collection_name:'Items'})
                ready_items.push({avatar_id,avatar_path,item_name,date_start,date_end,public_id})
            } catch (error) {}
        }
        //teraz tworze tokeny do zdjęcia
        for(let __ =0;__<ready_items.length;__++){
            try {
                ready_items[__].avatar_path = (await create_token_photo(ready_items[__].avatar_path,minutes_for_token_photo))[0]
            } catch (error) {
                ready_items[__].avatar_path = undefined
            }
        }
        return res.json({message:'Udało się pobrać produkty',data:ready_items})
    } catch (error) {
        console.log(error)
        return res.json({messsage:'Nie udało się pobrać produktów'})
    }
})
export{get_all_items}