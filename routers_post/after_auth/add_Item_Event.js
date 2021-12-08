import express from "express"
const addItemEvent = express.Router()
import {add_item_check_files} from '../../modules/after_auth/add_item_check_files.js'
import {makeId} from "../../modules/global/makeId.js"
import {add_event_to_db} from '../../modules/after_auth/add_event_to_db.js'
import {remove_item_from_db} from '../../modules/global/remove_item_from_db.js'
import {add_item_to_event} from '../../modules/after_auth/add_event_to_item.js'
import {check_format_and_add_file} from '../../modules/after_auth/add_files_to_db_pre_functions.js'
import {remove_file} from '../../modules/global/remove_file_in_storage.js'
import {add_item_event_validate} from '../../modules/global/add_item_event_validate.js'
import {validate_body_keys_without_return} from '../../modules/global/validate_body_keys.js'
addItemEvent.post('/addItemEvent',async(req,res)=>{
    //ZROBIC VALIDACJE NAZWY !
    //DODAC DATE DODANIA ALE TO Z FRONTU MA ISC ALBO Z BACKENDU

    
    const max_files_in_event = res.locals.max_item
    const max_size_files_in_event = res.locals.max_size_file
    const files_validate_info = res.locals.files_info
    const event_validate_info = res.locals.add_event_validate



        //ilość plików
        try {
            const require_to_validate =['token','public_id_item']
            const allow_to_pass = ['date_of_event','name','description']
            await validate_body_keys_without_return({body:req.body,require_to_validate,allow_to_pass})
            await add_item_event_validate({body:req.body,validate_info:event_validate_info})
            //zwraca null jeśli nie było wgl plikow , a jak były to tablice z blobami
            const files = await add_item_check_files({body:req.body,max_files:max_files_in_event,max_size:max_size_files_in_event,allow_format:files_validate_info.allow_format})
            //dodawanie zdj do bazy danych
            const public_id = await makeId(15)
            const private_id = `${await makeId(10)}.${public_id}.${await makeId(10)}`
            const item_Mother = res.locals.item_id
            const uid = res.locals.user.uid
            const path = `Items/${item_Mother}/`
            const date = req.body.date_of_event
            const description = req.body.description
            const name = req.body.name
    
                try {
                const added_photos = (files === null)? [] : await check_format_and_add_file({path:path,array_files:files})
               //dodawanie eventu do bazy danych
                await add_event_to_db({
                    public_id,
                    added_photos,
                    private_id,
                    item_Mother,
                    uid,
                    date,
                    description,
                    name
                })
                    try {
                    //dodanie eventu do przedmiotu
                        await add_item_to_event({
                            item_Mother,
                            private_id
                        })
                        return res.json({message:'Event został dodany do bazy danych'})
                    } catch (error) {
                        //usuwanie zdjec i dodany event
                        try {await remove_item_from_db({
                                collection:'Events',
                                doc:private_id
                            })} catch (error) {}
                       
                        if(added_photos.length >0){
                             for(let q=0;q<added_photos.length;q++){
                                 try { await remove_file(added_photos[q].path)} catch (error) { }
                             }
                         }
                        return res.json({message:"Dodawanie przedmiotu nie powiodło się"}) 
                    }
                 
                } catch (error) {
                
                    return res.json({message:"Dodawanie przedmiotu nie powiodło się"}) 
                }
           
            
        } catch (error) {
            return res.json({message:error})
        }
    
})
export{addItemEvent}