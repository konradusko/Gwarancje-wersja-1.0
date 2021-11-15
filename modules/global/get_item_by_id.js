import pkg from "firebase-admin"
const {firestore} = pkg
const get_item_by_id = (data)=>{
    return new Promise(async(res,rej)=>{
        const {id,action} = data;
        try {
            const items_data = await firestore().collection("Items").doc(id).get()
            if(!(items_data.exists))
            rej('Taki przedmiot nie istnieje')
            if(items_data.exists){
                switch (action) {
                    case 'owner':
                        res({owner:items_data._fieldsProto.owner.stringValue})
                        break;
                default:
                    rej()
                break;
                }
            }
        } catch (error) {
            rej()
        }
    })
}
export{get_item_by_id}