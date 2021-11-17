import {fetch_photo} from '../global/promise_fetch_photo.js'
const add_item_event_check_files = (data)=>{
    return new Promise(async(res,rej)=>{
        const {body,max_files,max_size} = data;
        let response_array = []
        if(!('files' in body))
            res(null)
        if('files'in body && !Array.isArray(body.files))
            rej('Files powinno byc tablicą z plikami')
        if('files'in body && Array.isArray(body.files) && body.files.length >max_files)
            rej(`Maksymalnie można dodać do ${max_files} plików.`)
        if('files'in body && Array.isArray(body.files) && body.files.length ==0)
            res(null)
        if('files'in body && Array.isArray(body.files) && body.files.length <=max_files){
            let temporary;
            for(let _=0;_<body.files.length;_++){
                temporary = await fetch_photo(body.files[_])
                if(temporary.type == "image/jpeg" || temporary.type == "image/png"||temporary.type == "image/jpg" || temporary.type == 'application/pdf'){
                    if(temporary.size<max_size){
                        response_array.push({obj:temporary,path:``})
                    }else{
                        rej('Niektóre pliki są za duże!')
                    }
                }else{
                    rej('Niektóre pliki maja zły format !')
                }
            }
            res(response_array)
        }
        
    })
}
export{add_item_event_check_files}