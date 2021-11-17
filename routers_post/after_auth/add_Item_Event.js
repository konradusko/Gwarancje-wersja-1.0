import express from "express"
const addItemEvent = express.Router()
import {add_item_event_check_files} from '../../modules/after_auth/add_item_event_check_files.js'
import {makeId} from "../../modules/global/makeId.js"
import {add_photo_to_storage_register} from '../../modules/global/add_photo_to_storage.js'
import {add_event_to_db} from '../../modules/after_auth/add_event_to_db.js'
addItemEvent.post('/addItemEvent',async(req,res)=>{
    const max_files_in_event = 2
    const max_size_files_in_event = 2100000
    //sprawdzic ten konkretny przedmiot
    console.log(res.locals.item_id)
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
            const files = await add_item_event_check_files({body:req.body,max_files:max_files_in_event,max_size:max_size_files_in_event})
            //dodawanie zdj do bazy danych
            const public_id = await makeId(10)
            const private_id = await makeId(30)
            const item_Mother = res.locals.item_id
            const uid = res.locals.user.uid
            const path = `Items/${item_Mother}/`
            const date = req.body.date
            const description = req.body.description
            let added_photos = []
            if(files != null){
                try {
                    for(let z =0;z<files.length;z++){
                        files[z].path = path+await makeId(10)
                        if(files[z].obj.type == "image/jpeg" || files[z].obj.type == "image/jpg")
                        files[z].path+=`.jpg`
                        if(files[z].obj.type == "image/png")
                        files[z].path+=`.png`
                        if(files[z].obj.type == "application/pdf")
                        files[z].path+=`.pdf`
                        await add_photo_to_storage_register(files[z].obj,files[z].path)
                        added_photos.push({
                            path:files[z].path,
                            type:files[z].obj.type,
                            id:await makeId(10)
                        })
                    }

               //dodawanie eventu do bazy danych
                await add_event_to_db({
                    public_id,
                    added_photos,
                    private_id,
                    item_Mother,
                    uid,
                    date,
                    description
                })
                 
                } catch (error) {
                    //usuwam dodane zdjecia
                    if(added_photos.length >0){
                        for(let q=0;q<added_photos.length;q++){
                            await remove_file(added_photos[q].path)
                        }
                    }
                    return res.json({message:"Dodawanie przedmiotu nie powiodło się"}) 
                }
           
            }
            if(files === null){
                //tylko dodaje do bazy danych bez zdj
            }
        } catch (error) {
            return res.json({message:error})
        }
    }
})
export{addItemEvent}