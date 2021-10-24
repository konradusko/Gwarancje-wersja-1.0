const route = require('express').Router();
const {isUserAuthorization} = require('../../modules/global/validate')
route.get('/',(req,res)=>{
    //tutaj jesli user jest nie zalogowany to z całymi sliderami sie pojawi
    res.render('auth.ejs', {
        template: '/'
    })
})
route.post('/',(req,res)=>{
    const page = '/before_auth/home.ejs'
    isUserAuthorization(req,res,page,false)
})
module.exports = route;
