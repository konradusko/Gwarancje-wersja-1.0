import express from "express"
const get_all_items = express.Router()
import {get_user_info_from_db} from '../../modules/after_auth/get_users_info.js'
get_all_items.post('/getAllItems',async(req,res)=>{
    const uid = res.locals.user.uid;
    try {
        const {items} = await get_user_info_from_db({uid:res.locals.user.uid,type:"items"})
        //pobrac wszystkie przedmioty
    } catch (error) {
        return res.json({messsage:'Nie udało się pobrać produktów'})
    }
})
export{get_all_items}