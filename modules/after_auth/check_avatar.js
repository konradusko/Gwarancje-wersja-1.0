import {fetch_photo} from '../global/promise_fetch_photo.js'
const check_avatar_type = (data)=>{
    return new Promise(async(res,rej)=>{
        const {body,allow_format,max_size} = data
        if(!('avatar' in body))
           return  res(null)
        try {
            const avatar = await fetch_photo(body.avatar)
            let tmp = allow_format.find(e=>e === avatar.type)

            if(tmp === undefined)
                return rej('Zdjęcie ma zły format')

            if(tmp != undefined &&avatar.size > max_size)
                return  rej('Avatar jest za duży')

            if(tmp != undefined && avatar.size < max_size)
                return res(avatar)
        } catch (error) {
            return rej('Avatar ma zły format , lub plik jest uszkodzony')
        }



    })
}
export{check_avatar_type}