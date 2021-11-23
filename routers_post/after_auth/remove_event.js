import {get_item_info_by_id} from '../../modules/global/get_item_info_by_id.js'
import express from "express"
const remvove_event = express.Router()
remvove_event.post('/removeEvent',async(req,res)=>{
    const item_id = res.locals.item_id;
    const event_id = res.locals.event_id
    const user_uid = res.locals.user.uid

    //usuniecie zdjec
    //uusniecie od uzytkownika
    //usuniecie z arrayu 
    try {
         const {files} =   await get_item_info_by_id({id:event_id,action:'event_files',collection_name:'Events'})
         
         if(files.length != 0)
         for(let _=0;_<files.length;_++){
            try {
                console.log(files[_].mapValue.fields.path.stringValue)
            } catch (error) {}
         }

    } catch (error) {
        return res.json({message:"Nie udało się usunąć eventu."})
    }

  
})
export{remvove_event}