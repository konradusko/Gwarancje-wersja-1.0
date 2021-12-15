import pkg from "firebase-admin"
const {firestore} = pkg
import {makeId,generateGuid} from "../global/makeId.js"
const add_new_user_to_db = (uid,avatar)=>{
    console.log('dodaje')
    return new Promise(async(res,rej)=>{
        const usersRef =  firestore().collection("Users");
        const privateId = generateGuid()
        await usersRef.doc(uid).set({
            items:[],
            slots:3,
            public_id: privateId,
            avatar:avatar
        })
        .then(()=>{
           return res()
        })//dodany
        .catch((er)=>{
           return rej(er)//nie udało sie dodać
        })
    })
}
export {add_new_user_to_db}