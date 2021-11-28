import express from "express"
const add_files_item = express.Router()
import {add_item_check_files} from '../../modules/after_auth/add_item_check_files.js'
import {get_item_info_by_id} from '../../modules/global/get_item_info_by_id.js'
import {check_format_and_add_file} from '../../modules/after_auth/add_files_to_db_pre_functions.js'
import {add_new_file_to_event_item} from '../../modules/global/add_new_file_to_event_item.js'
add_files_item.post('/addFileItem',async (req,res)=>{
    const max_files_in_item = res.locals.max_item
    const max_size_files_in_item = res.locals.max_size_file
    const item_id = res.locals.item_id
    //sprawdzenie ile zdj jest juz dodane
    //sprawdzenie zdj
    //dodanie do bazy danych
    const path = `Items/${item_id}/`
    try {
        const {files} = await get_item_info_by_id({id:item_id,action:"item_files",collection_name:'Items'})
        if(files.length == max_files_in_item || files.length >max_files_in_item)
        return res.json({message:'Brak wolnych miejsc na zdjęcia'})
        const max_size_this_case = max_files_in_item-files.length
        try {
            const check_images_array = await add_item_check_files({body:req.body,max_files:max_size_this_case,max_size:max_size_files_in_item,allow_format:['image/jpeg',"image/png","image/jpg","application/pdf"]})
            if(check_images_array == null)
                return res.json({message:'Nie podano żadnych plików'})
            
            try {
                //dodaje zdj do bazy danych
                const added_files = await check_format_and_add_file({path:path,array_files:check_images_array})
                await add_new_file_to_event_item({collection:'Items',doc_id:item_id,new_to_add:added_files,current_files:files})
                return res.json({message:"Pliki zostały dodane."})
            } catch (error) {
                return res.json({message:"Nie udało się dodać plików."})
            }

        } catch (error) {
          return res.json({message:error})
        }


    } catch (error) {
        //nie udało się pobrać plików z bazy danych
        return res.json({message:"Coś poszło nie tak."})
    }

})
export{add_files_item}