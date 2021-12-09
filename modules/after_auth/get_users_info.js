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
                        avatar:{
                            avatar_id:user_data._fieldsProto.avatar.mapValue.fields.id.stringValue,
                            avatar_path:user_data._fieldsProto.avatar.mapValue.fields.path.stringValue,
                            avatar_type:user_data._fieldsProto.avatar.mapValue.fields.type.stringValue,
                        },
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
                case'avatar':
                    res({avatar:{
                        avatar_id:user_data._fieldsProto.avatar.mapValue.fields.id.stringValue,
                        avatar_path:user_data._fieldsProto.avatar.mapValue.fields.path.stringValue,
                        avatar_type:user_data._fieldsProto.avatar.mapValue.fields.type.stringValue,
                        avatar_public:user_data._fieldsProto.avatar.mapValue.fields.public.booleanValue
                    }})
                break;
                default:
                    rej()
                break
            }
        }else{
           return rej("Nie udało się pobrać informacji o użytkowniku !")
        }
    })
}
export{get_user_info_from_db}