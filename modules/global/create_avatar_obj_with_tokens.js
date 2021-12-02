import {create_token_photo} from "./access_token_photo.js"
const create_avatar_obj_with_tokens = (data)=>{
    return new Promise(async(res,rej)=>{
        const {avatar,minutes} = data
        let obj = {}
        // console.log(avatar)
            try {
                obj.avatar_path = (await create_token_photo(avatar.avatar_path,minutes))[0]
            } catch (error) {
                obj.avatar_path = undefined
            }
            obj.avatar_type = avatar.avatar_type
            obj.avatar_id = avatar.avatar_id
           return res(obj)
    })
}
export{create_avatar_obj_with_tokens}