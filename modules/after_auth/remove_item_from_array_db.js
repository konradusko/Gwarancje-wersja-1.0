import pkg from "firebase-admin"
const {firestore} = pkg
const remove_item_from_array_db = (data)=>{
    return new Promise((res,rej)=>{
        const {doc_id,item_id,collection} = data
        const usersRef =  firestore().collection(collection).doc(doc_id)
        try {
            usersRef.update({
                items:firestore.FieldValue.arrayRemove(item_id)
            })
            res()
        } catch (error) {
            rej()
        }
    })
}
export{remove_item_from_array_db}