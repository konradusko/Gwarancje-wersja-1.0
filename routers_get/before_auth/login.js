const route = require('express').Router();
const {isUserAuthorization} = require('../../modules/global/validate')
route.get('/login',(req,res)=>{
    //tutaj tylko do logowania
    res.render('auth.ejs', {
        template: '/login'
    })
})
route.post('/login',(req,res)=>{
    const page = '/before_auth/login.ejs'
    isUserAuthorization(req,res,page,false)
})
module.exports = route;


