import {get_item_info_by_id} from '../global/get_item_info_by_id.js'
import {get_user_info_from_db} from './get_users_info.js'
const get_item_id_by_public_id_check_owner = (data)=>{
    return new Promise(async(res,rej)=>{
        const {public_id,uid} = data;
        try {
                const {items} = await get_user_info_from_db({uid:uid,type:"items"})
                const find  = items.find(item => (item.stringValue).split('.')[1] === public_id)
                if(find == undefined)
                rej()
                
                if(find != undefined){
                     const {owner} = await get_item_info_by_id({
                            id:find.stringValue,
                            action:'owner',
                            collection_name:'Items'
                        })

                if(owner != uid)
                    rej()
                if(owner === uid)
                    res({item_id:find.stringValue})
                }
                    
            

           
        } catch (error) {
            rej('Internal Error')
        }
    })
}
export{get_item_id_by_public_id_check_owner}