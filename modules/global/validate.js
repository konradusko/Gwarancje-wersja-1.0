import fs from "fs"
import pkg from 'firebase-admin'
const {auth} = pkg
const isUserAuthorization = (req, res, page,need_validation,java_script) =>{
    /*
    need_validation - wartości true-potrzebuje validacji; false-nie potrzebuje
    page - strona ktora bedziemy ladowac
    javascirpt - skrypty ktore musimy zaimportowac
    */
   console.log('xddd')
const token = req.body.token
console.log(token)
if(token == null && need_validation == false){
    console.log('case1')
//nie mamy tokena i go nie potrzebujemy wiec jest git
fs.readFile('views'+page, "utf-8", (err, temp) => {
    //wysylam templatke i usera
    res.json({
        template: temp,
        javascript_href:java_script
    })
})

}else if(token == null && need_validation == true){
    console.log('case2')
    //potrzebujemy tokena a go nie mamy to przekierować do strony logowania
    res.json({
        error:true,
        redirect:'/login',
    })

}else if(token != null && need_validation == false){
    console.log('case3')
    //mamy token a go nie potrzebujemy to przekierować na strone /home
    res.json({
        error:true,
        redirect:'/home'
    })
}else if(token != null && need_validation == true){
    console.log('case 4')
    //dobra jest token teraz trzeba go sprawdzic sobie
    auth().verifyIdToken(token)
        .then((decodedToken)=>{
            //jest git mamy uzytkownika
            fs.readFile('views'+page, "utf-8", (err, temp) => {
                //wysylam templatke i usera
                res.json({
                    template: temp,
                    javascript_href:java_script
                })
            })
        })
        .catch((err)=>{
            console.log(err)
            //token jest zły
            res.json({
                error:true,
                redirect:'/login'
            })
        })
}




}
export {isUserAuthorization}
