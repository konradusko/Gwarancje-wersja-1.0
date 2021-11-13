import pkg from "firebase-admin"
const {firestore} = pkg
const add_item_to_user_and_remove_slot = (data)=>{
    return new Promise((res,rej)=>{
        const {uid,private_id,slots} = data;
        const usersRef =  firestore().collection("Users");
        try {
            usersRef.doc(uid).set({
                items:firestore.FieldValue.arrayUnion(private_id),
                slots:slots
            },{merge:true})
            res()
        } catch (error) {
            rej(error)
        }
   
    })
}
export{add_item_to_user_and_remove_slot}