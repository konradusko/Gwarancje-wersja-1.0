const middleware_config = (req,res,next)=>{
    res.locals.max_item = 2
    res.locals.max_size_file = 2100000
    res.locals.minutes_for_avatar_token =20
    res.locals.minutes_for_files_token = 40
    res.locals.add_item_validate ={
        comment_max_length:1000,
        seller_adress_max_length:30,
        seller_adress_max_length:50,
        seller_email_max_length:50,
        phone_number_seller_max_length:50,
        serial_number_max_length:50,
        item_name_min_length:4,
        item_name_max_length:30,
        brand_max_length:30,
        brand_min_length:1,
        model_max_length:30,
        model_min_length:1,
        purchase_amount_max_length:30,
        purchase_amount_min_length:1,
        serial_number_max_length:30
    }
    res.locals.avatar_info = {
        allow_format:['image/jpeg',"image/png","image/jpg"],
        public_avatar:{
            type:'png',
            path:'./x/d/xd'
        },
        avatars_register:{
            one:{
                path:'',
                type:''
            },
            two:{
                path:'',
                type:''
            },
            three:{
                path:'',
                type:''
            }
        }
    }
    
    res.locals.files_info = {
        allow_format:['image/jpeg',"image/png","image/jpg","application/pdf"]
    }
    res.locals.add_event_validate = {
        name_max_length:50,
        name_min_length:4,
        description_max_length:300
    }
    next()
}
export{middleware_config}