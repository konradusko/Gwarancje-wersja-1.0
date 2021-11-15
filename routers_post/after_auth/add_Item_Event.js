import express from "express"
const addItemEvent = express.Router()
addItemEvent.post('/addItemEvent',async(req,res)=>{
    //sprawdzic ten konkretny przedmiot
    console.log('xd')
    console.log(res.locals.item_id)
})
export{addItemEvent}