import express from "express"
const get_item = express.Router()
import {get_item_info_by_id} from '../../modules/global/get_item_info_by_id.js'
get_item.post('/getItem',(req,res)=>{
    const item_id = res.locals.item_id
    try {
        
    } catch (error) {
        return res.json({message:'Nie udało siępobrać przedmiotu'})
    }
})
export{get_item}