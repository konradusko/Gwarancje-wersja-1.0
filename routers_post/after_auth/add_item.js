import express from "express"
const add_item = express.Router()
import {get_user_info_from_db} from "../../modules/after_auth/get_users_info.js"
add_item.post('/add_item',async(req,res)=>{
    try {
    const {slots} = await get_user_info_from_db({uid:res.locals.user.uid,case:"slots"})
    console.log(slots)
        if(slots !=0 &&Math.sign(slots) != -1){
            console.log(slots)
            //tutaj zrobić validacje potem
            
        }else{
            return res.json({message:"Brak wolnych slotów, dokup je"})
        }
    } catch (error) {
        return res.status(500).json({message:"Error 500 Internal server error"})
    }
})
export{add_item}