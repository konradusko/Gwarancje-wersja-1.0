import {makeId} from '../global/makeId.js'
import {add_photo_to_storage} from '../global/add_photo_to_storage.js'
import {remove_file} from '../global/remove_file_in_storage.js'
const check_format_and_add_file = (data)=>{
    return new Promise(async(res,rej)=>{
        const {path,array_files} = data;
        let added = []
        try {
            for(let x =0;x<array_files.length;x++){
                array_files[x].path = path+`${await makeId(25)}`
                if(array_files[x].type == "image/jpeg" || array_files[x].type == "image/jpg")
                array_files[x].path+=`.jpg`
                if(array_files[x].type == "image/png")
                array_files[x].path+=`.png`
                if(array_files[x].type == "application/pdf")
                array_files[x].path+=`.pdf`
                try {
                    await add_photo_to_storage(array_files[x].obj,array_files[x].path,array_files[x].type)
                    added.push({
                        path:array_files[x].path,
                        type:array_files[x].type,
                        id:await makeId(20)}
                       )
                } catch (error) {
                   //tutaj usunac wszystko
                   for(let q=0;q<added.length;q++){
                    try { await remove_file(added[q].path)} catch (error) { }
                }
               return rej()
                }
             
            }
           return res(added)
        } catch (error) {
           return rej()
        }
     
    })
}
export{check_format_and_add_file}