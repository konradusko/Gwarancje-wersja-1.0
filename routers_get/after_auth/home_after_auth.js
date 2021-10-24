const route = require('express').Router();
const {isUserAuthorization} = require('../../modules/global/validate')
route.get('/home',(req,res)=>{
    res.render('auth.ejs', {
        template: '/home'
    })
})
route.post('/home',(req,res)=>{
    const page = '/after_auth/home.ejs'
    isUserAuthorization(req,res,page,true)
})
module.exports = route;