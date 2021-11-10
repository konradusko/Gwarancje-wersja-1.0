import pkg from "firebase-admin"
const {firestore} = pkg
const add_item_to_db = ()=>{
    return new Promise(async(res,rej)=>{
        const dbRef =  firestore().collection("Items");
        dbRef.doc(private_id).set({
         
        })
        .then(()=>{res()})//dodany
        .catch((er)=>{
            rej(er)//nie udało sie dodać
        })
    })
}
export{add_item_to_db}

