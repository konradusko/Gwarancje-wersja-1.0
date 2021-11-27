import express from "express"
const remove_item_files = express.Router()
import {get_item_info_by_id} from '../../modules/global/get_item_info_by_id.js'
import {remove_files_from_array_db} from '../../modules/global/remove_photo_from_array.js'
import {remove_file} from '../../modules/global/remove_file_in_storage.js'
remove_item_files.post('/removeItemFiles',async (req,res)=>{
    const item_id = res.locals.item_id;

    //usuniecie przedmiotu od uzytkownika, a nastepnie usuniecie zdjecia
    if(!('item_photo_id_to_del' in req.body))
    return res.json({message:"Podaj id zdjęć do usuniecia."})

    //sprawdzenie czy taki przedmiot istniej
    try {
        const {files} = await get_item_info_by_id({id:item_id,action:"item_files",collection_name:'Items'})
        const item_to_del = files.find(e=>e.mapValue.fields.id.stringValue === req.body.item_photo_id_to_del)

        if(item_to_del === undefined)
        return res.json({message:'Takie id nie istnieje'})

        try {
            await remove_file(item_to_del.mapValue.fields.path.stringValue)
            try {
                 await remove_files_from_array_db({collection:"Items",doc_id:item_id,file_to_remove_id:req.body.item_photo_id_to_del,all_file:files})
                 return res.json({message:'Plik został usunięty'})
            } catch (error) {
                return res.json({message:"Nie udało się usunąć pliku."})
            }
        } catch (error) {
            return res.json({message:"Nie udało się usunąć pliku."})
        }
       
    } catch (error) {
        return res.json({message:"Nie udało się usunąć pliku."})
    }
})


export{remove_item_files}