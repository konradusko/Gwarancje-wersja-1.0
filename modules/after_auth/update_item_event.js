import pkg from "firebase-admin"
const {firestore} = pkg

const update_item_event = (data)=>{
    return new Promise(async (res,rej)=>{
        const {value,doc,collection} = data;
        const ref =  firestore().collection(collection).doc(doc)
        try {
            ref.update(value)
            return res()
        } catch (error) {
            return rej()
        }
    })
}
export{update_item_event}