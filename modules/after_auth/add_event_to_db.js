import pkg from "firebase-admin"
const {firestore} = pkg
const add_event_to_db = (data)=>{
    return new Promise((res,rej)=>{
        const {
            public_id,
            added_photos,
            private_id,
            item_Mother,
            uid,
            date,
            description
        } = data
        const dbRef =  firestore().collection("Events");
        
    })
}
export{add_event_to_db}