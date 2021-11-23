import {fetch_photo} from '../global/promise_fetch_photo.js'
const add_item_check_files = (data)=>{
    return new Promise(async(res,rej)=>{
        console.log('XD')
        const {body,max_files,max_size,allow_format} = data;
        let response_array = [],tmp=undefined
        if('files'in body && Array.isArray(body.files)&& body.files.length ===0)
            res(null)
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
                try {
                    temporary = await fetch_photo(body.files[_])
                    tmp = allow_format.find(e=> e === temporary.type)

                    if(tmp === undefined)
                    rej('Zdjęcia mają zły format lub są uszkodzone')

                    if(tmp != undefined && temporary.size > max_size)
                    rej('Niektóre pliki są za duże !')

                    if(tmp != undefined && temporary.size < max_size)
                    response_array.push({obj:temporary,path:``})


                } catch (error) {
                    rej('Zdjęcia maja zły format lub są uszkodzone.')
                }
             
            }
            res(response_array)
        }
        
    })
}
export{add_item_check_files}