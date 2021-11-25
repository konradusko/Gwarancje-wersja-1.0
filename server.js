import fs from 'fs'
import express from 'express'
const app = express()
const PORT = 4000
import firebase from 'firebase-admin'
const serviceAccount  = JSON.parse(fs.readFileSync('./firebase_key.json'))
import {createAccountLimiter} from "./modules/request_limit/request_limits.js"
//middleware do sprawdzania czy jest token i czy jest prawidlowy
import {middleware_token_check} from './modules/middleware/middleware_token_veryfy.js'
//middleware do sprawdzenia czy mamy uprawnienia co do tego przedmiotu
import {get_item_id_using_public_and_check_owner_middleware} from './modules/middleware/middleware_get_id_item.js'
//middleware ktory przekazuje wartosci
import {middleware_config} from './modules/middleware/middleware_config.js'
//middleware ktory sprawdza uprawnienia do eventu i zwraca prive_id
import {middleware_get_event_owner_by_public_id} from './modules/middleware/middleware_get_event_owner_by_public_id.js'
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    storageBucket:"gs://paragonytest-7d604.appspot.com/"
  });

//uzycie ejs
app.set('view engine','ejs');
//zebysmy mogli od razu reqesty jako jsona czytac
app.use(express.json());
app.use(express.urlencoded({extended:true}))
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
import {item_after_auth} from './routers_get/after_auth/item_after_auth.js'
app.get('/item',item_after_auth)
app.post('/item',item_after_auth)
//routers post
import {before_auth_POST_register} from "./routers_post/before_auth/register.js"
import {get_user_info} from "./routers_post/after_auth/get_user_info.js"
import {add_item} from "./routers_post/after_auth/add_item.js"
import {addItemEvent} from "./routers_post/after_auth/add_Item_Event.js"
import {remove_item} from './routers_post/after_auth/remove_item.js'
import {get_all_items} from './routers_post/after_auth/get_all_items.js'
import {get_item} from './routers_post/after_auth/get_item.js'
import {remvove_event} from './routers_post/after_auth/remove_event.js'
import {remove_user_avatar} from './routers_post/after_auth/remove_user_avatar.js'
import {add_new_avatar_to_userPOSTREQ} from './routers_post/after_auth/add_new_avatar_to_user.js'
app.post('/registerUser',createAccountLimiter,middleware_config,before_auth_POST_register)
app.post('/getUserInfo',middleware_token_check,get_user_info)
app.post('/addItem',middleware_token_check,middleware_config,add_item)
app.post('/addItemEvent',middleware_token_check,get_item_id_using_public_and_check_owner_middleware,middleware_config,addItemEvent)
app.post('/removeItem',middleware_token_check,get_item_id_using_public_and_check_owner_middleware,remove_item)
app.post('/getAllItems',middleware_token_check,get_all_items)
app.post('/getItem',middleware_token_check,get_item_id_using_public_and_check_owner_middleware,get_item)
app.post('/removeEvent',middleware_token_check,get_item_id_using_public_and_check_owner_middleware,middleware_get_event_owner_by_public_id,remvove_event)
app.post('/removeUserAvatar',middleware_token_check,remove_user_avatar)
app.post('/addNewAvatarUser',middleware_token_check,middleware_config,add_new_avatar_to_userPOSTREQ)

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });