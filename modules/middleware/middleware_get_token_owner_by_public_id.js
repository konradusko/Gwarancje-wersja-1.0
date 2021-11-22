import {get_item_info_by_id} from '../global/get_item_info_by_id.js'
const middleware_get_token_owner_by_public_id = async(req,res,next) =>{
    const uid = res.locals.user.uid
    const item_id = res.locals.item_id;
    if('event_public_id' in req.body){
        //pobranie listy eventów
        const {events} = await get_item_info_by_id({id:item_id,action:'events',collection_name:"Items"})
        console.log(evnets)
        // const event_private_id  = events.find(item => (item.stringValue).split('.')[1] === public_id)
    }else{
        return res.json({message:"Podaj publiczne id eventu."})
    }
}
export{middleware_get_token_owner_by_public_id}