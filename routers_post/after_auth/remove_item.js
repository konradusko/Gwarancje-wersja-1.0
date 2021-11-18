import express from "express"
const remove_item = express.Router()
import {remove_item_from_user} from '../../modules/after_auth/remove_item_from_user.js'
remove_item.post('/removeItem',async(req,res)=>{
    const item_id = res.locals.item_id;
    const uid = res.locals.user.uid
    //usuniecie od uzytkownika
    //usuniecie z bazy danych zdjec
    //usuniecie eventow
    //usuniecie przedmiotu
    try {
        console.log('remove')
        await remove_item_from_user({uid,item_id})
    } catch (error) {
        return res.json({message:'Wystąpił błąd podczas usuwania przedmiotu!'})
    }
})
export{remove_item}