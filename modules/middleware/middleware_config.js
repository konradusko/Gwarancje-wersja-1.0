const middleware_config = (req,res,next)=>{
    res.locals.max_item = 2
    res.locals.max_size_file = 2100000
    next()
}
export{middleware_config}