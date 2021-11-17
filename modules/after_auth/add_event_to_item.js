import pkg from "firebase-admin"
const {firestore} = pkg
const add_item_to_event = (data)=>{
    return new Promise((res,rej)=>{
        const {item_Mother,private_id} = data;
        const itemRef =  firestore().collection("Items");
        try {
            itemRef.doc(item_Mother).set({
                items:firestore.FieldValue.arrayUnion(private_id)
            },{merge:true})
            res()
        } catch (error) {
            rej(error)
        }
    })
}
export{add_item_to_event}