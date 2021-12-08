import express from "express"
const get_user_info = express.Router()
import {get_user_info_from_db} from "../../modules/after_auth/get_users_info.js"
import {create_avatar_obj_with_tokens} from '../../modules/global/create_avatar_obj_with_tokens.js'
import {validate_body_keys_without_return} from '../../modules/global/validate_body_keys.js'
get_user_info.post('/getUserInfo',async(req,res)=>{ 

    const minutes_for_token_photo = res.locals.minutes_for_avatar_token
    console.log(minutes_for_token_photo)
    try {
        const require_to_validate = ['token']
        const allow_to_pass = []
        await validate_body_keys_without_return({body:req.body,require_to_validate,allow_to_pass})
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