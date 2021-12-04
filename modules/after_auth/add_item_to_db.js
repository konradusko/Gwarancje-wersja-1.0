import pkg from "firebase-admin"
const {firestore} = pkg
const add_item_to_db = (data)=>{
    //DODAC JESZCZE DOKLADNA DATE DODANIA PRZEDMIOTU
    return new Promise(async(res,rej)=>{
        const {item_to_add,private_id} = data
        const dbRef =  firestore().collection("Items");
        dbRef.doc(private_id).set(item_to_add)
        .then(()=>{
            return res()})//dodany
        .catch((er)=>{
           return rej(er)//nie udało sie dodać
        })
    })
}
export{add_item_to_db}

