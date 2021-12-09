import express from "express"
const remove_user_avatar = express.Router()
import {remove_file} from '../../modules/global/remove_file_in_storage.js'
import {get_user_info_from_db} from "../../modules/after_auth/get_users_info.js"
import {add_new_avatar} from '../../modules/after_auth/add_new_avatar.js'
import {makeId} from '../../modules/global/makeId.js'
import { isHtml } from "../../modules/global/is_html_in_text.js"
remove_user_avatar.post('/removeUserAvatar', async(req,res)=>{
    const uid = res.locals.user.uid;
    const item_id = res.locals.item_id;
    const avatar_info_validate = res.locals.avatar_info
    if('avatar_id' in req.body && typeof req.body.avatar_id === 'string' && isHtml(req.body.avatar_id))
        return res.json({message:'Id zawiera niedozwolone znaki'})
    if('avatar_id' in req.body && typeof req.body.avatar_id === 'string'){
        try {
            const {avatar} = await get_user_info_from_db({uid:uid,type:"avatar"})
            if(avatar.avatar_id != req.body.avatar_id)
            return res.json({message:'Podane id nie istnieje.'})

            if(avatar.avatar_id === req.body.avatar_id && avatar.avatar_public === true)
            return res.json({message:"Nie można usunąć publicznego avatara."})

            const new_avatar = { // publiczny avatar
                path:avatar_info_validate.public_avatar.path,
                id:await makeId(10),
                type:avatar_info_validate.public_avatar.type,
                public:true
            }
            await add_new_avatar({uid:item_id,avatar:new_avatar,collection:'Users'})
            try {
                //usuwamy starego
                await remove_file(avatar.path)
                return res.json({message:"Avatar został usunięty!"})
            } catch (error) {
                return res.json({message:"Avatar został usunięty!"})
            }
        } catch (error) {
            return res.json({message:"Coś poszło nie tak."})
        }
    }else{
        return res.json({message:"Brakuje id avataru lub jest on nieprawidłowy."})

    }

})
export{remove_user_avatar}