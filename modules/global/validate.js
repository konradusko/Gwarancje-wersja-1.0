const fs = require('fs')
const firebase = require('firebase-admin')
const auth = firebase.auth()
const isUserAuthorization = (req, res, page,need_validation) =>{
    /*
    need_validation - wartości true-potrzebuje validacji; false-nie potrzebuje
    */
const token = req.body.token
console.log(token)
if(token == undefined && need_validation == false){
//nie mamy tokena i go nie potrzebujemy wiec jest git
fs.readFile('views'+page, "utf-8", (err, temp) => {
    //wysylam templatke i usera
    res.json({
        template: temp
    })
})

}else if(token == undefined && need_validation == true){
    //potrzebujemy tokena a go nie mamy to przekierować do strony logowania
    res.json({
        error:true,
        redirect:'/login'
    })

}else if(token != undefined && need_validation == false){
    //mamy token a go nie potrzebujemy to przekierować na strone /home
    res.json({
        error:true,
        redirect:'/home'
    })
}else if(token != undefined && need_validation == true){
    //dobra jest token teraz trzeba go sprawdzic sobie
    auth.verifyIdToken(token)
        .then((decodedToken)=>{
            //jest git mamy uzytkownika
            fs.readFile('views'+page, "utf-8", (err, temp) => {
                //wysylam templatke i usera
                res.json({
                    template: temp
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

module.exports = {
    isUserAuthorization
}