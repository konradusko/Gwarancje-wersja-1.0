import express from "express"
const remove_user_avatar = express.Router()
import {remove_file} from '../../modules/global/remove_file_in_storage.js'
import {get_user_info_from_db} from "../../modules/after_auth/get_users_info.js"
import {add_new_avatar} from '../../modules/after_auth/add_new_avatar.js'
import {makeId} from '../../modules/global/makeId.js'
remove_user_avatar.post('/removeUserAvatar', async(req,res)=>{
    const uid = res.locals.user.uid;
    if('avatar_id' in req.body){
        try {
            const {avatar} = await get_user_info_from_db({uid:uid,type:"avatar"})
            if(avatar.avatar_id != req.body.avatar_id)
            return res.json({message:'Podane id nie istnieje.'})

            if(avatar.avatar_id === req.body.avatar_id && avatar.avatar_public === true)
            return res.json({message:"Nie można usunąć publicznego avatara."})

            const new_avatar = {
                path:'url',
                id:await makeId(10),
                type:'type',
                public:true
            }
            await add_new_avatar({uid:uid,avatar:new_avatar,collection:'Users'})
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

    if(!('avatar_id' in req.body))
    return res.json({message:"Brakuje id avataru."})
})
export{remove_user_avatar}