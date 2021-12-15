import fs from "fs"
import pkg from 'firebase-admin'
import { isHtml } from "./is_html_in_text.js"

const {auth} = pkg
const isUserAuthorization = (req, res, page,need_validation,java_script) =>{
    /*
    need_validation - wartości true-potrzebuje validacji; false-nie potrzebuje
    page - strona ktora bedziemy ladowac
    javascirpt - skrypty ktore musimy zaimportowac
    */
    if(!('token' in req.body))
    return res.json({message:'Token jest wymagany'})
    if(!(typeof req.body.token === 'string'))
    return res.json({message:'Token musi być typem string.'})
    if(isHtml(req.body.token))
    return res.json({message:'Token zawiera niedozwolone znaki.'})

const token = req.body.token


   auth().verifyIdToken(token)
    .then((dec_token)=>{
        if(need_validation == false){
        //mamy token a go nie potrzebujemy to przekierować na strone /home
        res.json({
            error:true,
            redirect:'/home'
        })
        }else if(need_validation == true){
            //mamy token i go potrzebujemy
            fs.readFile('views'+page, "utf-8", (err, temp) => {
                //wysylam templatke i usera
                res.json({
                    template: temp,
                    javascript_href:java_script
                })
            })
        }
    })
    .catch((err)=>{
        if(need_validation == true){
            res.json({
                error:true,
                redirect:'/login',
            })
        }else if(need_validation == false){
            fs.readFile('views'+page, "utf-8", (err, temp) => {
                //wysylam templatke i usera
                res.json({
                    template: temp,
                    javascript_href:java_script
                })
            })
        }
    })

}
export {isUserAuthorization}
