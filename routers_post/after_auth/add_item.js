import express from "express"
const add_item = express.Router()
import {get_user_info_from_db} from "../../modules/after_auth/get_users_info.js"
import {add_item_validate} from '../../modules/after_auth/add_item_validate.js'
import {fetch_photo} from '../../modules/global/promise_fetch_photo.js'
import {add_item_to_db} from '../../modules/after_auth/add_item_to_db.js'
import {makeId} from "../../modules/global/makeId.js"
import {remove_file} from '../../modules/global/remove_file_in_storage.js'
import {remove_item_from_db} from '../../modules/global/remove_item_from_db.js'
import {add_item_to_user_and_remove_slot} from "../../modules/after_auth/add_item_to_user_and_take_slot.js"
import {add_item_check_files} from '../../modules/after_auth/add_item_check_files.js'
import {check_format_and_add_file} from '../../modules/after_auth/add_files_to_db_pre_functions.js'
import {check_avatar_type} from '../../modules/after_auth/check_avatar.js'
import {check_format_and_add_avatar} from '../../modules/after_auth/add_avatar_to_db_pre_functions.js'
add_item.post('/addItem',async(req,res)=>{

    try {
    let tmp;
    const max_size = res.locals.max_size_file // bajty
    const max_files_in_event = res.locals.max_item
    const {slots} = await get_user_info_from_db({uid:res.locals.user.uid,type:"slots"})
    console.log(slots)
        if(slots !=0 &&Math.sign(slots) != -1){
            //tutaj zrobić validacje potem
            //czego potrzebuje
            //zrobić validacje
            //potem sprawdzić zdjęcia

            //1. validacja danych czy wszystko mamy i wszystko jest jak powinno byc
            try {
                // await add_item_validate(req.body)
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
             
                try {
                    const check_images = await add_item_check_files({body:req.body,max_files:max_files_in_event,max_size:max_size,allow_format:['image/jpeg',"image/png","image/jpg","application/pdf"]})
                    const avatar = await check_avatar_type({body:req.body,allow_format:['image/jpeg',"image/png","image/jpg"],max_size:max_size})
                    
                    //tutaj jeszcze validacje avatara zrobic
                    const public_id = await makeId(20)
                    const private_id = `${await makeId(15)}.${public_id}.${await makeId(10)}`
                    const path = `Items/${private_id}/`
             
    
                    try {
                    //dodanie avatara
                    const avatar_object = await check_format_and_add_avatar({obj:avatar,path:path})
                    const  photos_paths = (check_images === null)? []:  await check_format_and_add_file({path:path,array_files:check_images})
                       
                        // Stworzyc item
                        try {
                            //sprawdzić nie wymagane przedmioty
                            const serial_number = ('serial_number' in req.body)?req.body.serial_number:''
                            const additional_description = ('additional_description' in req.body)?req.body.additional_description:''
                            const seller_name = ('seller_name' in req.body)? req.body.seller_name:''
                            const seller_adress = ('seller_adress' in req.body)? req.body.seller_adress:''
                            const seller_email = ('seller_email' in req.body)? req.body.seller_email:''
                            const phone_number_seller = ('phone_number_seller' in req.body)? req.body.phone_number_seller:''
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
                                const {slots} = await get_user_info_from_db({uid:res.locals.user.uid,type:"slots"})
                                if(slots !=0 &&Math.sign(slots) != -1){
                                    const count = slots-1;
                                  
                                        await add_item_to_user_and_remove_slot({
                                            uid:uid,
                                            private_id:private_id,
                                            slots:count
                                        })
                                        return res.json({message:"Przedmiot został dodany"})
                                   
                                }else{
                                    return res.json({message:"Brak wolnych slotów, dokup je"})  
                                }
                            } catch (error) {
                                //usuwam pliki oraz usuwam przedmiot ktory został dodany
                                try {await remove_file(path)} catch (error) {}
                                try {
                                    await remove_item_from_db({
                                        collection:'Items',
                                        doc:private_id
                                    })
                                } catch (error) {}
                              
                                return res.json({message:"Dodawanie przedmiotu nie powiodło się"}) 
                            }
                            
                        } catch (error) {
                          //Usuwam to co dodałem i zwracam błąd
                          try {await remove_file(path)} catch (error) {}
                          return res.json({message:"Dodawanie przedmiotu nie powiodło się"}) 
                        }
                    } catch (error) {
                        //Usuwam to co dodałem i zwracam błąd
                        try {await remove_file(path)} catch (error) {}
                        return res.json({message:"Dodawanie przedmiotu nie powiodło się"})            
                    }
                } catch (error) {
                    //validacja plikow
                    return res.json({message:error})
                }
                

               
            } catch (error) {
                //od validacji
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