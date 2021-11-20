import pkg from "firebase-admin"
const {firestore} = pkg
const get_user_info_from_db = (data)=>{
    //data zawiera w sobie uid oraz do switcha opcje
    return new Promise(async(res,rej)=>{
        const {uid,type} =data
       const user_data = await firestore().collection("Users").doc(uid).get()
        if(user_data.exists){
            switch (type) {
                case "photo_slots":
                    res({
                        slots:user_data._fieldsProto.slots.integerValue,
                        photo:user_data._fieldsProto.photo.stringValue
                    })
                    break;
                case "slots":
                    res({
                        slots:user_data._fieldsProto.slots.integerValue
                    })
                break;
                case 'items':
                    res({
                        items:user_data._fieldsProto.items.arrayValue.values
                    })
                break;
            }
        }else{
            rej("Nie udało się pobrać informacji o użytkowniku !")
        }
    })
}
export{get_user_info_from_db}