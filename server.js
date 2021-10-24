const express = require('express')
const app = express()
const PORT = 4000
const firebase = require('firebase-admin')
const serviceAccount = require("./firebase_key.json");
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
  });
//uzycie ejs
app.set('view engine','ejs');
//zebysmy mogli od razu reqesty jako jsona czytac
app.use(express.json());
//w folderze public style itd
app.use(express.static("public"));
//routers get
//before login
const before_auth_home = require('./routers_get/before_auth/home_before_auth')
const before_auth_login = require('./routers_get/before_auth/login')
const before_auth_register = require('./routers_get/before_auth/register')
app.get('/register',before_auth_register)
app.post('/register',before_auth_register)
app.get('/login',before_auth_login)
app.post('/login',before_auth_login)
app.get('/',before_auth_home)
app.post('/',before_auth_home)
//after login
const after_auth_home = require('./routers_get/after_auth/home_after_auth')
app.get('/home',after_auth_home)
app.post('/home',after_auth_home)
//routers post
const before_auth_POST_register = require('./routers_post/before_auth/register')
app.post('/registerUser',before_auth_POST_register)




app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });