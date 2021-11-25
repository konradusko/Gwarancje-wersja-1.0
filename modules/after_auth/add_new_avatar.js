import pkg from "firebase-admin"
const {firestore} = pkg
const add_new_avatar = (data)=>{
    return new Promise((res,rej)=>{
        const {uid,avatar,collection} = data;
        const usersRef =  firestore().collection(collection);
        try {
            usersRef.doc(uid).set({
               avatar:avatar
            },{merge:true})
            res()
        } catch (error) {
            rej(error)
        }
    })
}
export{add_new_avatar}