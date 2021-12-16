import {makeId} from '../global/makeId.js'
import {add_photo_to_storage} from '../global/add_photo_to_storage.js'
const check_format_and_add_avatar = (data)=>{
    return new Promise(async(res,rej)=>{
        const {obj,path,public_image} = data
        let  avatar_object
        if(obj === null){
            avatar_object ={
                path:public_image.path,
                type:public_image.type,
                id: await makeId(20),
                public:true
            }
           return res(avatar_object)
        }

        if(obj != null){
          avatar_object = {
                path:path+`${await makeId(25)}`,
                obj:obj
            }
            if(avatar_object.obj.type == "image/jpeg" || avatar_object.obj.type == "image/jpg")
            avatar_object.path += `.jpg`
            if(avatar_object.obj.type == "image/png")
                avatar_object.path += `.png`
            try {
                await add_photo_to_storage(avatar_object.obj.blob,avatar_object.path,avatar_object.obj.type)
               const obj_to_return={
                    path:avatar_object.path,
                    type:avatar_object.obj.type,
                    id:await makeId(20),
                    public:false
                }
               return res(obj_to_return)
            } catch (error) {
               return rej()
            }
        }
    
    })
}
export{check_format_and_add_avatar}