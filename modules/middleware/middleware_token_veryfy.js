import {check_token} from "../global/check_token.js"
import { isHtml } from "../global/is_html_in_text.js"
const middleware_token_check = async(req,res,next)=>{
    if("token" in req.body && typeof body.token === 'string' && isHtml(body.token))
        return res.json({message:'Niedozwolone znaki w tokenie.'})
    if("token" in req.body && typeof body.token === 'string'){
        try {
            const user_uid = await check_token(req.body.token)
            res.locals.user = user_uid
            next()
        } catch (error) {
            return res.json({message:"Token jest nie prawidłowy !"})
        }
    }else{
        return res.json({message:"Brak Tokenu !"})
    }
}
export{middleware_token_check}