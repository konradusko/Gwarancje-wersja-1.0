const middleware_config = (req,res,next)=>{
    res.locals.max_item = 2
    res.locals.max_size_file = 2100000
    res.locals.add_item_validate ={
        comment_max_length:1000,
        seller_adress_max_length:30,
        seller_adress_max_length:50,
        seller_email_max_length:50,
        phone_number_seller_max_length:50,
        purchase_amount_max_length:30,
        serial_number_max_length:50
    }
    res.locals.add_event_validate = {
        name_max_length:50,
        description_max_length:300
    }
    next()
}
export{middleware_config}