const route = require('express').Router();
const {register} = require('../../modules/before_auth/register')
route.post('/registerUser',async(req,res)=>{
    console.log(req.body)
    console.log('wyzej request body')
    try {
       const result = await register({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })
    } catch (error) {
        
    }
 
})
module.exports = route;