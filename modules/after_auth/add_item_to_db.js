import pkg from "firebase-admin"
const {firestore} = pkg
const add_item_to_db = (data)=>{
    return new Promise(async(res,rej)=>{
        const {private_id,public_id,images,owner} = data
        const dbRef =  firestore().collection("Items");
        dbRef.doc(private_id).set({
            public_id:public_id,
            images:images,
            owner:owner,
            share_with:[]
        })
        .then(()=>{res()})//dodany
        .catch((er)=>{
            console.log(er)
            rej(er)//nie udało sie dodać
        })
    })
}
export{add_item_to_db}

