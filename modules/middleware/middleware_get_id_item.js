import {get_item_id_by_public_id} from '../after_auth/get_item_id_using_public_id.js'
const get_item_id_using_public = async(req,res,next)=>{
    if('public_id_item' in req.body){
        const uid = res.locals.user.uid
        try {
           const {item_id} = await get_item_id_by_public_id({
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
        return res.json({message:"Podaj publiczne id przedmiotu."})
    }
}
export{get_item_id_using_public}