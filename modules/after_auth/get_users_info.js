import pkg from "firebase-admin"
const {firestore} = pkg
const get_user_info_from_db = (data)=>{
    //data zawiera w sobie uid oraz do switcha opcje
    return new Promise(async(res,rej)=>{
       const user_data = await firestore().collection("Users").doc(data.uid).get()
        if(user_data.exists){
            switch (data.case) {
                case "photo_slots":
                    const slots = user_data._fieldsProto.slots.integerValue
                    const photo = user_data._fieldsProto.photo.stringValue
                    res({slots:slots,
                        photo:photo})
                    break;
            }
        }else{
            rej("Nie udało się pobrać informacji o użytkowniku !")
        }
    })
}
export{get_user_info_from_db}