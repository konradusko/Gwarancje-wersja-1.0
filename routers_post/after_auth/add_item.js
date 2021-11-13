import express from "express"
const add_item = express.Router()
import {get_user_info_from_db} from "../../modules/after_auth/get_users_info.js"
import {add_item_validate} from '../../modules/after_auth/add_item_validate.js'
import {fetch_photo} from '../../modules/global/promise_fetch_photo.js'
import {add_item_to_db} from '../../modules/after_auth/add_item_to_db.js'
import {makeId} from "../../modules/global/makeId.js"
// import {create_pdf_file} from "../../modules/global/create_pdf_file.js"
import {add_photo_to_storage_register} from '../../modules/global/add_photo_to_storage.js'
import {remove_file} from '../../modules/global/remove_file_in_storage.js'
import {remove_item_from_db} from '../../modules/global/remove_item_from_db.js'
import {add_item_to_user_and_remove_slot} from "../../modules/after_auth/add_item_to_user_and_take_slot.js"
add_item.post('/add_item',async(req,res)=>{

    try {
    let tmp;
    const max_size = 2100000 // bajty
    const {slots} = await get_user_info_from_db({uid:res.locals.user.uid,case:"slots"})
    console.log(slots)
        if(slots !=0 &&Math.sign(slots) != -1){
            console.log(slots)
            //tutaj zrobić validacje potem
            //czego potrzebuje
            //zrobić validacje
            //potem sprawdzić zdjęcia

            //1. validacja danych czy wszystko mamy i wszystko jest jak powinno byc
            try {
                
                const validate_item = await add_item_validate()
                const files = req.body.files
                const uid = res.locals.user.uid
                console.log(uid)
                let check_images = []
                //2. validacje plików które chcemy dodać
                for(let _=0;_<files.length;_++){
                    //dla wszystkich sprawdzam czy rozmiar jest poprawny etc
                    tmp = await fetch_photo(files[_])//dać tutaj zdjęcie
                    if(tmp.type == "image/jpeg" || tmp.type == "image/png"||tmp.type == "image/jpg" || tmp.type == 'application/pdf'){
                        if(tmp.size > max_size){
                            return res.json({message:"Zdjęcie jest za duże"})
                        }else{
                            check_images.push({
                                obj:tmp,
                                path:''
                            })
                        }
                    }else{
                        return res.json({message:'Zdjęcie ma zły format'})
                    }

                }
                const public_id = await makeId(20)
                const private_id = `${await makeId(15)}.${public_id}.${await makeId(10)}`
                const path = `Items/${private_id}/`
                let photos_paths = []
                //tworzenie pdfów
                try {
                    for(let x =0;x<check_images.length;x++){
                        check_images[x].path = path+`${await makeId(12)}`
                        if(check_images[x].obj.type == "image/jpeg" || check_images.obj.type == "image/jpg")
                        check_images[x].path+=`.jpg`
                        if(check_images[x].obj.type == "image/png")
                        check_images[x].path+=`.png`
                        if(check_images[x].obj.type == "application/pdf")
                        check_images[x].path+=`.pdf`
                        await add_photo_to_storage_register(check_images[x].obj,check_images[x].path)
                        photos_paths.push({
                            path:check_images[x].path,
                            type:check_images[x].obj.type})
                    }
                    // Stworzyc item
                    try {
                        //dodac do bazy danych
                         await add_item_to_db({
                            private_id:private_id,
                            public_id:public_id,
                            images:photos_paths,
                            owner:uid
                        })
                        //dodać przedmiot do użytkownika i odjąć mu slota
                        try {
                            const {slots} = await get_user_info_from_db({uid:res.locals.user.uid,case:"slots"})
                            if(slots !=0 &&Math.sign(slots) != -1){
                                const count = slots-1;
                                try {
                                    await add_item_to_user_and_remove_slot({
                                        uid:uid,
                                        private_id:private_id,
                                        slots:count
                                    })
                                    return res.json({message:"Przedmiot został dodany"})
                                } catch (error) {
                                    await remove_file(path)
                                    await remove_item_from_db({
                                        collection:'Items',
                                        doc:private_id
                                    })
                                    return res.json({message:"Dodawanie przedmiotu nie powiodło się"}) 
                                }
                               
                            }else{
                                return res.json({message:"Brak wolnych slotów, dokup je"})  
                            }
                        } catch (error) {
                            //usuwam pliki oraz usuwam przedmiot ktory został dodany
                            await remove_file(path)
                            await remove_item_from_db({
                                collection:'Items',
                                doc:private_id
                            })
                            return res.json({message:"Dodawanie przedmiotu nie powiodło się"}) 
                        }
                        
                    } catch (error) {
                      //Usuwam to co dodałem i zwracam błąd
                      await remove_file(path)
                      return res.json({message:"Dodawanie przedmiotu nie powiodło się"}) 
                    }
                } catch (error) {
                    //Usuwam to co dodałem i zwracam błąd
                    await remove_file(path)
                    return res.json({message:"Dodawanie przedmiotu nie powiodło się"})            
                }
            } catch (error) {
                return res.json({message:error})
            }

        }else{
            return res.json({message:"Brak wolnych slotów, dokup je"})
        }
    } catch (error) {
        return res.status(500).json({message:"Error 500 Internal server error"})
    }
})
export{add_item}