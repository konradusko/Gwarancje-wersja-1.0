import express from "express"
const update_Item = express.Router()
import {validate_update_item} from '../../modules/after_auth/update_item_validate.js'
import {update_item_event} from '../../modules/after_auth/update_item_event.js'
import {validate_body_keys} from '../../modules/global/validate_body_keys.js'
update_Item.post('/updateItem',async(req,res)=>{
    const item_id = res.locals.item_id
    const validate_info = res.locals.add_item_validate;
    //sprawdzam
    //najpierw czy jest któraś z wymaganych inaczej wypierdalam error
    const require_to_validate = ['public_id_item','token']
    const allow_to_pass = ['warranty_end_date','comment','seller_name','seller_adress','seller_email','phone_number_seller','purchase_amount','serial_number']
    try {
        const filter_array = await validate_body_keys({body:req.body,require_to_validate:require_to_validate,allow_to_pass:allow_to_pass})
        try {
            await validate_update_item({body:req.body,validate_info:validate_info})
            //wszystko git z walidacja wiec udostepniamy
            let to_update = {}
            filter_array.forEach(element =>{
                to_update[element] = req.body[element]
            })
            try {
                //aktualizujemy
                await update_item_event({value:to_update,doc:item_id,collection:'Items'})
                return res.json({message:'Przedmiot został zaktualizowany.'})
            } catch (error) {
                return res.json({message:'Nie udało się zaktualizować przedmiotu.'})
            }
        } catch (error) {
            return res.json({message:error})
        }
    } catch (error) {
        return res.json({message:error})
    }

})
export{update_Item}