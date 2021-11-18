import pkg from "firebase-admin"
const {firestore} = pkg
const remove_item_from_user = (data)=>{
    return new Promise((res,rej)=>{
        const {uid,item_id} = data
        const usersRef =  firestore().collection("Users").doc(uid)
        try {
            usersRef.update({
                items:firestore.FieldValue.arrayRemove(item_id)
            })
            console.log(item_id)
        } catch (error) {
            console.log(error)
        }
    })
}
export{remove_item_from_user}