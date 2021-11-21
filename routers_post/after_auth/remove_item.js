import express from "express"
const remove_item = express.Router()
import {remove_item_from_user} from '../../modules/after_auth/remove_item_from_user.js'
import {remove_item_from_db} from '../../modules/global/remove_item_from_db.js'
import {get_item_info_by_id} from "../../modules/global/get_item_info_by_id.js"
import {remove_file} from '../../modules/global/remove_file_in_storage.js'
remove_item.post('/removeItem',async(req,res)=>{
    const item_id = res.locals.item_id;
    const uid = res.locals.user.uid
    //usuniecie od uzytkownika
    //usuniecie z bazy danych zdjec
    //usuniecie eventow
    //usuniecie przedmiotu
    try {
        await remove_item_from_user({uid,item_id})
        const {events} = await get_item_info_by_id({id:item_id,action:"events",collection_name:'Items'})
        if(events.length>0)
        for(let _=0;_<events.length;_++){
            try {
              await remove_item_from_db({collection:'Events',doc:events[_]})
            } catch (error) {            }
        }
        //usuwanie zdjeć
        try { await await remove_file(`Items/${item_id}`) } catch (error) {}
        //usuwanie przedmiotu
        try {
            await remove_item_from_db({collection:'Items',doc:item_id})
        } catch (error) {}
        return res.json({message:'Przedmiot został usunięty'})
    } catch (error) {
        return res.json({message:'Wystąpił błąd podczas usuwania przedmiotu!'})
    }
})
export{remove_item}