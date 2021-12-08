import express from "express"
const add_item = express.Router()
import {get_user_info_from_db} from "../../modules/after_auth/get_users_info.js"
import {add_item_validate} from '../../modules/after_auth/add_item_validate.js'
import {add_item_to_db} from '../../modules/after_auth/add_item_to_db.js'
import {makeId} from "../../modules/global/makeId.js"
import {remove_file} from '../../modules/global/remove_file_in_storage.js'
import {remove_item_from_db} from '../../modules/global/remove_item_from_db.js'
import {add_item_to_user_and_remove_slot} from "../../modules/after_auth/add_item_to_user_and_take_slot.js"
import {add_item_check_files} from '../../modules/after_auth/add_item_check_files.js'
import {check_format_and_add_file} from '../../modules/after_auth/add_files_to_db_pre_functions.js'
import {check_avatar_type} from '../../modules/after_auth/check_avatar.js'
import {check_format_and_add_avatar} from '../../modules/after_auth/add_avatar_to_db_pre_functions.js'
import {validate_body_keys_without_return} from '../../modules/global/validate_body_keys.js'
add_item.post('/addItem',async(req,res)=>{

    try {
    const max_size = res.locals.max_size_file // bajty
    const max_files_in_event = res.locals.max_item
    const validate_info = res.locals.add_item_validate;
    const avatar_info = res.locals.avatar_info
    const files_validate_info = res.locals.files_info
    const {slots} = await get_user_info_from_db({uid:res.locals.user.uid,type:"slots"})
    console.log(slots)
        if(slots !=0 &&Math.sign(slots) != -1){
            //tutaj zrobić validacje potem
            //czego potrzebuje
            //zrobić validacje
            //potem sprawdzić zdjęcia

            //1. validacja danych czy wszystko mamy i wszystko jest jak powinno byc
      
            //sprawdzam czy w body nie ma czegos niechcianego
            const require_to_validate = ['token']
            const allow_to_pass = ['serial_number','seller_name','seller_adress','seller_email','phone_number_seller','phone_number_seller','item_name','brand','model','purchase_amount','warranty_start_date','warranty_end_date','warranty_time']
                try {
                    await validate_body_keys_without_return({body:req.body,require_to_validate,allow_to_pass})
                    await add_item_validate(req.body,validate_info)
                    const public_id = await makeId(20)
                    const private_id = `${await makeId(15)}.${public_id}.${await makeId(10)}`
                    const path = `Items/${private_id}/`
                    const uid = res.locals.user.uid
                    try {
                        const check_images = await add_item_check_files({body:req.body,max_files:max_files_in_event,max_size:max_size,allow_format:files_validate_info.allow_format})
                        const avatar = await check_avatar_type({body:req.body,allow_format:avatar_info.allow_format,max_size:max_size})
                        //tutaj jeszcze validacje avatara zrobic
                        try {
                        //dodanie avatara
                        const avatar_object = await check_format_and_add_avatar({obj:avatar,path:path,public_image:avatar_info.public_avatar})
                        const  photos_paths = (check_images === null)? []:  await check_format_and_add_file({path:path,array_files:check_images})
                            // Stworzyc item
                            try {
                                //sprawdzić nie wymagane przedmioty
                                const serial_number = ('serial_number' in req.body)?req.body.serial_number:''
                                const seller_name = ('seller_name' in req.body)? req.body.seller_name:''
                                const seller_adress = ('seller_adress' in req.body)? req.body.seller_adress:''
                                const seller_email = ('seller_email' in req.body)? req.body.seller_email:''
                                const phone_number_seller = ('phone_number_seller' in req.body)? req.body.phone_number_seller:''
                                const comment = ('phone_number_seller' in req.body)? req.body.comment:''
                                //wymagane
                                const item_name = req.body.item_name
                                const brand = req.body.brand
                                const model = req.body.model
                                const purchase_amount = req.body.purchase_amount
                                const warranty_start_date = req.body.warranty_start_date
                                const warranty_end_date = 'warranty_end_date' in req.body? {
                                    value:req.body.warranty_end_date,
                                    type:'end_date'
                                }:{
                                    value:req.body.warranty_time,
                                    type:'end_date'
                                }
                                const events = []
                                //dodac do bazy danych
                                 await add_item_to_db({
                                    item_to_add:{
                                        public_id:public_id,
                                        files:photos_paths,
                                        owner:uid,
                                        avatar:avatar_object,
                                        serial_number,
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
                                        comment,
                                        events
                                    }, 
                                    private_id:private_id
                                 }
                                 )
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
                                        try {await remove_file(path)} catch (error) {}
                                        try {
                                            await remove_item_from_db({
                                                collection:'Items',
                                                doc:private_id
                                            })
                                        } catch (error) {}
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
                        console.log(error)
                        console.log('errr')
                        //validacja plikow
                        try {await remove_file(path)} catch (error) {}
                        return res.json({message:error})
                    }
                } catch (error) {
                    console.log('xddd')
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