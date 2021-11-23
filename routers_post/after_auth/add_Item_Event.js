import express from "express"
const addItemEvent = express.Router()
import {add_item_check_files} from '../../modules/after_auth/add_item_check_files.js'
import {makeId} from "../../modules/global/makeId.js"
import {add_event_to_db} from '../../modules/after_auth/add_event_to_db.js'
import {remove_item_from_db} from '../../modules/global/remove_item_from_db.js'
import {add_item_to_event} from '../../modules/after_auth/add_event_to_item.js'
import {check_format_and_add_file} from '../../modules/after_auth/add_files_to_db_pre_functions.js'
addItemEvent.post('/addItemEvent',async(req,res)=>{
    //ZROBIC VALIDACJE NAZWY !


    
    const max_files_in_event = res.locals.max_item
    const max_size_files_in_event = res.locals.max_size_file
    //sprawdzic ten konkretny przedmiot
    if(!('date' in req.body))
        return res.json({message:'Wydarzenie musi zawierać date!'})
    if(!('description' in req.body))
        return res.json({message:'Wydarzenie musi zawierać opis sytuacji!'})
    if('date' in req.body && "description" in req.body){
        const date_event = req.body.date
        const description_event = req.body.description
        //validacja daty
        if(!(typeof date_event === 'string'))
            return res.json({message:'Data musi być stringiem w formacie yyyy/mm/dd'})
        if(typeof date_event === 'string' && Date.parse(date_event) === NaN)
            return res.json({message:'Data ma zły format.'})

        //validacja opisu
        if(!(typeof description_event === 'string'))
            return res.json({message:'Opis musi mieć format tekstu'})
        if(typeof description_event === 'string' && description_event.length === 0)
            return res.json({message:'Opis nie może być pusty!'})

        //ilość plików
        try {
            //zwraca null jeśli nie było wgl plikow , a jak były to tablice z blobami
            const files = await add_item_check_files({body:req.body,max_files:max_files_in_event,max_size:max_size_files_in_event,allow_format:['image/jpeg',"image/png","image/jpg","application/pdf"]})
            //dodawanie zdj do bazy danych
            const public_id = await makeId(15)
            const private_id = `${await makeId(10)}.${public_id}.${await makeId(10)}`
            const item_Mother = res.locals.item_id
            const uid = res.locals.user.uid
            const path = `Items/${item_Mother}/`
            const date = req.body.date
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
                    //usuwam dodane zdjecia
                    if(added_photos.length >0){
                        for(let q=0;q<added_photos.length;q++){
                            try { await remove_file(added_photos[q].path)} catch (error) { }
                        }
                    }
                    return res.json({message:"Dodawanie przedmiotu nie powiodło się"}) 
                }
           
            
        } catch (error) {
            console.log('czy to ???')
            return res.json({message:error})
        }
    }
})
export{addItemEvent}