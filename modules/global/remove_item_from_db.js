import pkg from "firebase-admin"
const {firestore} = pkg
const remove_item_from_db = (data)=>{
    return new Promise((res,rej)=>{
        const {collection,doc} =data

            const dbRef =  firestore().collection(collection);
            dbRef.doc(doc).delete().then(()=>{
                res()
            })
            .catch((er)=>{
                rej(er)
            })

    })
}
export{remove_item_from_db}