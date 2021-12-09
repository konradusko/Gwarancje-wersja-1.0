import {get_item_info_by_id} from '../../modules/global/get_item_info_by_id.js'
import {remove_file} from '../../modules/global/remove_file_in_storage.js'
import {remove_item_from_array_db} from '../../modules/after_auth/remove_item_from_array_db.js'
import {remove_item_from_db} from '../../modules/global/remove_item_from_db.js'
import {validate_body_keys_without_return} from '../../modules/global/validate_body_keys.js'
import express from "express"
const remvove_event = express.Router()
remvove_event.post('/removeEvent',async(req,res)=>{
    const item_id = res.locals.item_id;
    const event_id = res.locals.event_id

    //usuniecie zdjec
    //usuniecie z arrayu 
    //usunac z bazy danych
    try {
        const require_to_validate = ['public_id_item','token','event_public_id']
        const allow_to_pass = []
        await validate_body_keys_without_return({body:req.body,require_to_validate,allow_to_pass})
        try {

            const {files} =   await get_item_info_by_id({id:event_id,action:'event_files',collection_name:'Events'})
            
            if(files.length != 0)
            for(let _=0;_<files.length;_++){
               try {
                   await remove_file(files[_].mapValue.fields.path.stringValue)
               } catch (error) {}
            }
            //teraz usunac od uzytkownika
            try {
                await remove_item_from_array_db({doc_id:item_id,item_id:event_id,collection:'Items',option:'event'})
                //usunąć z bazy danych
                await remove_item_from_db({collection:"Events",doc:event_id})
                return res.json({message:'Event został usunięty pomyślnie.'})
            } catch (error) {
                return res.json({message:"Wystąpił błąd podczas usuwania eventu."})
            }
   
       } catch (error) {
           return res.json({message:"Nie udało się usunąć eventu."})
       }
    } catch (error) {
            return res.json({message:error})
    }
  

  
})
export{remvove_event}