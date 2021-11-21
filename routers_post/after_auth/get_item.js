import express from "express"
const get_item = express.Router()
import {get_item_info_by_id} from '../../modules/global/get_item_info_by_id.js'
import {create_token_photo} from "../../modules/global/access_token_photo.js"
import {create_obj_with_tokens_files} from '../../modules/global/create_obj_with_tokens_files.js'
get_item.post('/getItem',async (req,res)=>{

    const minutes_for_token_photo = 20
    const uid = res.locals.user.uid
    const item_id = res.locals.item_id
    let item_to_send = {
        events:[],
        files:[],
        avatar:{

        }
    }
    let tmp;
    try {
        const item_value = await get_item_info_by_id({id:item_id,action:"whole_item",collection_name:'Items'})
        console.log(item_value)
        if(item_value.events.length != 0)
        for(let _=0;_<item_value.events;_++){
            try {//pobieram info i eventach
                tmp = await get_item_info_by_id({id:item_value.events[_],action:"event_front",collection_name:'Events'})
                if(tmp.added_by == uid)
                item_to_send.events.push({
                    public_id:tmp.public_id,
                    name:tmp.name,
                    date_of_event:tmp.date_of_event
                })
           
                
               
            } catch (error) {
                return res.json({message:'Nie udało się pobrać przedmiotu'})
            }

        }
         //zrobienie avatara
                console.log(item_value.avatar)
            try {
                item_to_send.avatar.avatar_path = (await create_token_photo(item_value.avatar.avatar_path,minutes_for_token_photo))[0]
                item_to_send.avatar.id = item_value.avatar.avatar_id;
            } catch (error) {
                item_to_send.avatar.avatar_path = undefined;
                item_to_send.avatar.id = item_value.avatar.avatar_id;
            }
                //zrobienie przedmiotów
            if(item_value.files.length !=0)
                item_to_send.files = await create_obj_with_tokens_files({array_of_items:item_value.files,minutes:minutes_for_token_photo})

            item_to_send.data = item_value.data
            return res.json({message:"udało sie pobrac przedmiot",data:item_to_send})

       


    } catch (error) {
        console.log(error)
        return res.json({message:'Nie udało się pobrać przedmiotu'})
    }
})
export{get_item}