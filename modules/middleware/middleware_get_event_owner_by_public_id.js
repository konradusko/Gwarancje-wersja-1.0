import {get_item_info_by_id} from '../global/get_item_info_by_id.js'
const middleware_get_event_owner_by_public_id = async(req,res,next) =>{

    if('event_public_id' in req.body){
        const uid = res.locals.user.uid
        const item_id = res.locals.item_id;
        const public_id_event = req.body.event_public_id
        //pobranie listy eventów
        try {
            const {events} = await get_item_info_by_id({id:item_id,action:'events',collection_name:"Items"})
            // console.log(events)
            const event_private_id  = events.find(item => (item.stringValue).split('.')[1] === public_id_event)
            //pobierz wlasciciela przedmiotu i sprawdz xd
            if(event_private_id  === undefined)
            return res.json({message:'Nie masz dostępu do tego eventu.'})
            const {added_by}  = await get_item_info_by_id({id:event_private_id.stringValue,action:'event_added_by',collection_name:"Events"})
            if(added_by != uid)
            return res.json({message:'Nie masz dostępu do tego eventu.'})

            res.locals.event_id = event_private_id.stringValue
            next()
        } catch (error) {
            //jeśli nie istnieje albo coś
            return res.json({message:"Coś poszło nie tak."})
        }

    }else{
        return res.json({message:"Podaj publiczne id eventu."})
    }
}
export{middleware_get_event_owner_by_public_id}