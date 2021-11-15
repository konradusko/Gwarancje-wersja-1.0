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
                await add_item_validate(req.body)
                const files = req.body.files
                const uid = res.locals.user.uid

                if("avatar" in req.body){
                    const avatar = await fetch_photo(req.body.avatar)
                    if(avatar.type == "image/jpeg" || avatar.type == "image/png" ||avatar.type == "image/jpg" ){
                        if(avatar.size > max_size){
                            return res.json({message:"Avatar jest za duży"})
                        }
                    }else{
                        return res.json({message:'Avatar ma zły format'})
                    }
                }
             


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
                let avatar_object;

                try {
                //dodanie avatara
                if("avatar" in req.body){
                     avatar_object = {
                        path:path+`${await makeId(12)}`,
                        obj:avatar
                    }
                    if(avatar_object.obj.type == "image/jpeg" || avatar_object.obj.type == "image/jpg")
                        avatar_object.path += `.jpg`
                    if(avatar_object.obj.type == "image/png")
                        avatar_object.path += `.png`
                    
                    await add_photo_to_storage_register(avatar_object.obj,avatar_object.path)
                    avatar_object={
                        path:avatar_object.path,
                        type:avatar_object.obj.type,
                        id:await makeId(10)
                    }
                }else{
                    //nie dodali avatara to ikona będzie dodana
                    avatar_object ={
                        path:'scieżka do przykladowego',
                        type:'tyyyypp',
                        id: await makeId(10)
                    }
                }
                  

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
                            type:check_images[x].obj.type,
                            id:await makeId(10)}
                           )
                    }
                    // Stworzyc item
                    try {
                        //sprawdzić nie wymagane przedmioty
                        const serial_number = ('serial_number' in req.body)?req.body.serial_number:null
                        const additional_description = ('additional_description' in req.body)?req.body.additional_description:null
                        const seller_name = ('seller_name' in req.body)? req.body.seller_name:null
                        const seller_adress = ('seller_adress' in req.body)? req.body.seller_adress:null
                        const seller_email = ('seller_email' in req.body)? req.body.seller_email:null
                        const phone_number_seller = ('phone_number_seller' in req.body)? req.body.phone_number_seller:null
                        const comment = ('comment' in req.body)? req.body.comment:''
                        //wymagane
                        const item_name = req.body.item_name
                        const brand = req.body.brand
                        const model = req.body.model
                        const purchase_amount = req.body.purchase_amount
                        const warranty_start_date = req.body.warranty_start_date
                        const warranty_end_date = req.body.warranty_end_date
                        //dodac do bazy danych
                         await add_item_to_db({
                            private_id:private_id,
                            public_id:public_id,
                            images:photos_paths,
                            owner:uid,
                            avatar:avatar_object,
                            serial_number,
                            additional_description,
                            seller_name,
                            seller_adress,
                            seller_email,
                            phone_number_seller,
                            item_name,
                            brand,
                            model,
                            purchase_amount,
                            warranty_start_date,
                            warranty_end_date,
                            comment
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