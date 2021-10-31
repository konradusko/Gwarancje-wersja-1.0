import pkg from "firebase-admin"
const {firestore} = pkg
import {makeId} from "../global/makeId.js"
const add_new_user_to_db = (uid,img)=>{
    return new Promise(async(res,rej)=>{
        const usersRef =  firestore().collection("Users");
        const privateId = await makeId(40)
        await usersRef.doc(uid).set({
            items:[],
            slots:3,
            public_id: privateId,
            photo:img
        })
        .then(()=>{res()})//dodany
        .catch((er)=>{
            rej(er)//nie udało sie dodać
        })
    })
}
export {add_new_user_to_db}