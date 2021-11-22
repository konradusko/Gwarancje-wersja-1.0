import express from "express"
const remvove_event = express.Router()
remvove_event.post('/removeEvent',(req,res)=>{
    const item_id = res.locals.item_id;
    
})
export{remvove_event}