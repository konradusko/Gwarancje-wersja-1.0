import pkg from "firebase-admin"
const {firestore} = pkg
const add_event_to_db = (data)=>{
    return new Promise((res,rej)=>{
        //dodac date dodania
        const {
            public_id,
            added_photos,
            private_id,
            item_Mother,
            uid,
            date,
            description,
            name
        } = data
        const dbRef =  firestore().collection("Events");
        dbRef.doc(private_id).set({
         public_id:public_id,
         files:added_photos,
        mother:item_Mother,
        added_by:uid,
        date_of_event:date,
        description:description,
        name:name
        })
        .then(()=>{
            return res()
        })//dodany
        .catch((er)=>{
           return rej(er)//nie udało sie dodać
        })
    })
}
export{add_event_to_db}