import express from "express"
const get_user_info = express.Router()
import {get_user_info_from_db} from "../../modules/after_auth/get_users_info.js"
import {create_token_photo} from "../../modules/global/access_token_photo.js"
import {create_avatar_obj_with_tokens} from '../../modules/global/create_avatar_obj_with_tokens.js'
get_user_info.post('/getUserInfo',async(req,res)=>{ 
    const minutes_for_token_photo = 20
    try {
        const {slots,avatar} = await get_user_info_from_db({uid:res.locals.user.uid,type:"photo_slots"})
        try {
            const access_token_photo = await create_avatar_obj_with_tokens({avatar:avatar,minutes:minutes_for_token_photo})
            return res.json({slots:slots,photo:access_token_photo})
        } catch (error) {
            return res.json({slots:slots,photo:null})
        }
    } catch (error) {
        return res.json({message:error})
    }
})
export {get_user_info}