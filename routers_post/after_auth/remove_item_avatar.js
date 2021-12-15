import express from "express"
const remove_item_avatar = express.Router()
import {get_item_info_by_id} from '../../modules/global/get_item_info_by_id.js'
import {add_new_avatar} from '../../modules/after_auth/add_new_avatar.js'
import {makeId} from '../../modules/global/makeId.js'
import {remove_file} from '../../modules/global/remove_file_in_storage.js'
import { isHtml } from "../../modules/global/is_html_in_text.js"

remove_item_avatar.post('/removeItemAvatar',async(req,res)=>{
    const uid = res.locals.user.uid
    const item_id = res.locals.item_id
    const avatar_info_validate = res.locals.avatar_info
    if(!('avatar_id' in req.body))
        return res.json({message:"Brakuje id avataru."})

    if('avatar_id' in req.body && !(typeof req.body.avatar_id === 'string'))
        return res.json({message:'Avatar_id musi być typem string'})
    if('avatar_id' in req.body && typeof req.body.avatar_id === 'string' && isHtml(req.body.avatar_id))
        return res.json({message:'Avatar zawiera niedozwolone znaki.'})

    if('avatar_id' in req.body){
        //mamy id avatara
        try {
            const {avatar} = await get_item_info_by_id({id:item_id,action:"avatar",collection_name:'Items'})
            if(avatar.avatar_id != req.body.avatar_id)
            return res.json({message:'Podane id nie istnieje.'})
    
            if(avatar.avatar_id === req.body.avatar_id && avatar.avatar_public === true)
            return res.json({message:"Nie można usunąć publicznego avatara."})
    
            const new_avatar = {
                path:avatar_info_validate.public_avatar.path,
                id:await makeId(20),
                type:avatar_info_validate.public_avatar.type,
                public:true
            }

            await add_new_avatar({uid:uid,avatar:new_avatar,collection:'Items'})
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
    }
})
export{remove_item_avatar}