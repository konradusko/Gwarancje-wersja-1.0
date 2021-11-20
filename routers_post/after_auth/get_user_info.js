import express from "express"
const get_user_info = express.Router()
import {get_user_info_from_db} from "../../modules/after_auth/get_users_info.js"
import {create_token_photo} from "../../modules/global/access_token_photo.js"
get_user_info.post('/getUserInfo',async(req,res)=>{ 
    try {
        const {slots,photo} = await get_user_info_from_db({uid:res.locals.user.uid,type:"photo_slots"})
        try {
            const access_token_photo = await create_token_photo(photo,5)
            return res.json({slots:slots,photo:access_token_photo[0]})
        } catch (error) {
            return res.json({slots:slots,photo:null})
        }
    } catch (error) {
        return res.json({message:error})
    }
})
export {get_user_info}