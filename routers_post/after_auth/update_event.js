import express from "express"
const update_Event = express.Router()
import {validate_body_keys} from '../../modules/global/validate_body_keys.js'
import {validate_update_event} from '../../modules/after_auth/validate_update_event.js'
import {update_item_event} from '../../modules/after_auth/update_item_event.js'
update_Event.post('/updateEvent',async (req,res)=>{
    const event_id = res.locals.event_id
    const event_validate_info = res.locals.add_event_validate;
    const require_to_validate = ['public_id_item','token','event_public_id']
    const allow_to_pass = ['date_of_event','name','description']

    try {
        const filter_array = await validate_body_keys({body:req.body,require_to_validate:require_to_validate,allow_to_pass:allow_to_pass})
        //validacja
        await validate_update_event({body:req.body,validate_info:event_validate_info})
        let to_update = {}
        filter_array.forEach(element =>{
            to_update[element] = req.body[element]
        })
        try {
            //aktualizujemy
            await update_item_event({value:to_update,doc:event_id,collection:'Events'})
            return res.json({message:'Event został zaktualizowany.'})
        } catch (error) {
            return res.json({message:'Nie udało się zaktualizować eventu'})
        }
    } catch (error) {
        return res.json({message:error})
    }


})
export{update_Event}