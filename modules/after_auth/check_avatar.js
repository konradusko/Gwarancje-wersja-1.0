import {fetch_photo} from '../global/promise_fetch_photo.js'
import {isHtml} from '../global/is_html_in_text.js'
import {check_photo_format} from '../validate_photo/check_photo_format.js'
const check_avatar_type = (data)=>{
    return new Promise(async(res,rej)=>{
        const {body,allow_format,max_size} = data
        console.log(allow_format)
        if(!('avatar' in body))
           return  res(null)
           console.log('eeeee')
        if('avatar' in body && !(typeof body.avatar === 'string'))
        return rej('Avatar musi byc typem string')

        if('avatar' in body && isHtml(body.avatar))
        return rej('Avatar zawiera niedozwolone znaki.')

            try {
                const avatar = await fetch_photo(body.avatar)
                const type = await check_photo_format(avatar)
                console.log(type,'avatar')
                let tmp = allow_format.find(e=>e === type)
    
                if(tmp === undefined)
                    return rej('Zdjęcie ma zły format')
    
                if(tmp != undefined &&avatar.size > max_size)
                    return  rej('Avatar jest za duży')
    
                if(tmp != undefined && avatar.size < max_size)
                    return res({blob:avatar,type:type})
            } catch (error) {
                return rej('Avatar ma zły format , lub plik jest uszkodzony')
            }
        
        



    })
}
export{check_avatar_type}