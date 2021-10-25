const route = require('express').Router();
const {isUserAuthorization} = require('../../modules/global/validate')
route.get('/register',(req,res)=>{
    //tutaj sama rejestracja
    res.render('auth.ejs', {
        template: '/register'
    })
})
route.post('/register',(req,res)=>{
    const page = '/before_auth/register.ejs'
    isUserAuthorization(req,res,page,false,"main_register.js")
})
module.exports = route;
