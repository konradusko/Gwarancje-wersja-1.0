import { isHtml } from '../global/is_html_in_text.js';
import {fetch_photo} from '../global/promise_fetch_photo.js'

const add_item_check_files = (data)=>{
    return new Promise(async(res,rej)=>{
        const {body,max_files,max_size,allow_format} = data;
        let response_array = [],tmp=undefined
        if('files'in body && Array.isArray(body.files)&& body.files.length ===0)
           return res(null)
        if(!('files' in body))
           return res(null)
        if('files'in body && !Array.isArray(body.files))
           return rej('Files powinno byc tablicą z plikami')
        if('files'in body && Array.isArray(body.files) && body.files.length >max_files)
            return rej(`Maksymalnie można dodać do ${max_files} plików.`)
        if('files'in body && Array.isArray(body.files) && body.files.length ==0)
            return res(null)
        if('files'in body && Array.isArray(body.files) && body.files.length <=max_files){
            let temporary;
            for(let _=0;_<body.files.length;_++){
                if(!(typeof body.files[_] === 'string'))
                    return rej('Niektóre pliki nie maja formatu string')
                if(isHtml(body.files[_]))
                return rej('Niektóre pliki zawierają nieodpowiedni format.')
                try {
                    temporary = await fetch_photo(body.files[_])
                    tmp = allow_format.find(e=> e === temporary.type)

                    if(tmp === undefined)
                        return rej('Zdjęcia mają zły format lub są uszkodzone')

                    if(tmp != undefined && temporary.size > max_size)
                    return   rej('Niektóre pliki są za duże !')

                    if(tmp != undefined && temporary.size < max_size)
                    response_array.push({obj:temporary,path:``})


                } catch (error) {
                    return rej('Zdjęcia maja zły format lub są uszkodzone.')
                }
             
            }
            return res(response_array)
        }
        
    })
}
export{add_item_check_files}