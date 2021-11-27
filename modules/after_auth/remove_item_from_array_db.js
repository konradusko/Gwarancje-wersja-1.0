import pkg from "firebase-admin"
const {firestore} = pkg
const remove_item_from_array_db = (data)=>{
    return new Promise((res,rej)=>{
        const {doc_id,item_id,collection,option} = data
        console.log(data)
        const usersRef =  firestore().collection(collection).doc(doc_id)
        try {
            switch (option) {
                case 'user':
                    usersRef.update({
                        items:firestore.FieldValue.arrayRemove(item_id)
                    })
                    res()
                    break;
                    case 'event':
                        usersRef.update({
                            events:firestore.FieldValue.arrayRemove(item_id)
                        })
                        res()
                    break;
                default:
                    rej()
                    break;
            }
          
        } catch (error) {
            console.log(error)
            rej()
        }
    })
}
export{remove_item_from_array_db}