import fs from 'fs'
import express from 'express'
const app = express()
const PORT = 4000
import firebase from 'firebase-admin'
const serviceAccount  = JSON.parse(fs.readFileSync('./firebase_key.json'))
import {createAccountLimiter} from "./modules/request_limit/request_limits.js"
//middleware do sprawdzania czy jest token i czy jest prawidlowy
import {middleware_token_check} from './modules/global/middleware_token_veryfy.js'
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    storageBucket:"gs://paragonytest-7d604.appspot.com/"
  });

//uzycie ejs
app.set('view engine','ejs');
//zebysmy mogli od razu reqesty jako jsona czytac
app.use(express.json());
//w folderze public style itd
app.use(express.static("public"));


//routers get
//before login
import {before_auth_home} from "./routers_get/before_auth/home_before_auth.js"
import {before_auth_login} from "./routers_get/before_auth/login.js"
import {before_auth_register} from "./routers_get/before_auth/register.js"
app.get('/register',before_auth_register)
app.post('/register',before_auth_register)
app.get('/login',before_auth_login)
app.post('/login',before_auth_login)
app.get('/',before_auth_home)
app.post('/',before_auth_home)
//after login
import {after_auth_home} from "./routers_get/after_auth/home_after_auth.js"
app.get('/home',after_auth_home)
app.post('/home',after_auth_home)
//routers post
import {before_auth_POST_register} from "./routers_post/before_auth/register.js"
import {get_user_info} from "./routers_post/after_auth/get_user_info.js"
import {add_item} from "./routers_post/after_auth/add_item.js"
app.post('/registerUser',createAccountLimiter,before_auth_POST_register)
app.post('/getUserInfo',middleware_token_check,get_user_info)
app.post('/add_item',middleware_token_check,add_item)




app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });