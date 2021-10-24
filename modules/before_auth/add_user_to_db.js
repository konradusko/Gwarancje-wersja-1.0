const firebase = require('firebase-admin')
const db = firebase.firestore()
const {makeId} = require('../global/makeId')
const add_new_user_to_db = (uid)=>{
    return new Promise(async(res,rej)=>{
        const usersRef =  db.collection("Users");
        const privateId = await makeId(40)
        await usersRef.doc(uid).set({
            items:[],
            slots:3,
            public_id: privateId
        })
        .then(()=>{res()})//dodany
        .catch((er)=>{
            rej(er)//nie udało sie dodać
        })
    })
}
module.exports ={
    add_new_user_to_db
}