import {get_item_id_by_public_id_check_owner} from '../after_auth/get_item_id_using_public_id_check_owner.js'
import { isHtml } from '../global/is_html_in_text.js'
const get_item_id_using_public_and_check_owner_middleware = async(req,res,next)=>{
    if('public_id_item' in req.body && typeof req.body.public_id_item === 'string' && isHtml(req.body.public_id_item))
        return res.json({message:'Niedozwolone znaki w tekscie.'})
    if('public_id_item' in req.body && typeof req.body.public_id_item === 'string'){
        const uid = res.locals.user.uid
        try {
           const {item_id} = await get_item_id_by_public_id_check_owner({
                public_id:req.body.public_id_item,
                uid:uid
            })
            res.locals.item_id = item_id
            next()
        } catch (error) {
            if(error == 'Internal Error')
            return res.status(500).json({message:"Nie udało się pobrać przedmiotu"})
            return res.json({message:"Nie masz uprawnień do tego przedmiotu !"})
        }
    }else{
        return res.json({message:"Podaj publiczne id przedmiotu w poprawnym formacie."})
    }
}
export{get_item_id_using_public_and_check_owner_middleware}