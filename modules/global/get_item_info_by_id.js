import pkg from "firebase-admin"
const {firestore} = pkg
const get_item_info_by_id = (data)=>{
    return new Promise(async(res,rej)=>{
        const {id,action,collection_name} = data;
        try {
            const items_data = await firestore().collection(collection_name).doc(id).get()

            if(!(items_data.exists))
            rej('Taki przedmiot nie istnieje')
            if(items_data.exists){
                switch (action) {
                    case 'owner':
                        res({owner:items_data._fieldsProto.owner.stringValue})
                        break;

                    case 'events':
                        res({events:items_data._fieldsProto.events.arrayValue.values})
                    break;
                    case 'home_data':
                        res(
                        {
                            avatar:{
                                avatar_id:items_data._fieldsProto.avatar.mapValue.fields.id.stringValue,
                                avatar_path:items_data._fieldsProto.avatar.mapValue.fields.path.stringValue,
                                avatar_type:items_data._fieldsProto.avatar.mapValue.fields.type.stringValue,
                            },
                            item_name:items_data._fieldsProto.item_name.stringValue,
                            date_start:items_data._fieldsProto.warranty_start_date.stringValue,
                            date_end:items_data._fieldsProto.warranty_end_date.stringValue,
                            public_id:items_data._fieldsProto.public_id.stringValue
                        }
                        )
                    break;
                    case 'whole_item':
                        console.log(items_data)
                        res(
                            {
                                avatar:{
                                    avatar_id:items_data._fieldsProto.avatar.mapValue.fields.id.stringValue,
                                    avatar_path:items_data._fieldsProto.avatar.mapValue.fields.path.stringValue,
                                    avatar_type:items_data._fieldsProto.avatar.mapValue.fields.type.stringValue,
                                    avatar_public:items_data._fieldsProto.avatar.mapValue.fields.public.booleanValue
                                },
                                files:items_data._fieldsProto.files.arrayValue.values,
                                events:items_data._fieldsProto.events.arrayValue.values,
                                data:{
                                    public_id:items_data._fieldsProto.public_id.stringValue,
                                    item_name:items_data._fieldsProto.item_name.stringValue,
                                    date_start:items_data._fieldsProto.warranty_start_date.stringValue,
                                    date_end:items_data._fieldsProto.warranty_end_date.stringValue,
                                    seller_email:items_data._fieldsProto.seller_email.stringValue,
                                    seller_adress:items_data._fieldsProto.seller_adress.stringValue,
                                    model:items_data._fieldsProto.model.stringValue,
                                    purchase_amount:items_data._fieldsProto.purchase_amount.stringValue,
                                    brand:items_data._fieldsProto.brand.stringValue,
                                    comment:items_data._fieldsProto.comment.stringValue,
                                    seller_name:items_data._fieldsProto.seller_name.stringValue,
                                    serial_number:items_data._fieldsProto.serial_number.stringValue,
                                    phone_number_seller:items_data._fieldsProto.phone_number_seller.stringValue,
                                }
                            }
                            )
                    break;

                case 'event_front':
                            res({
                                public_id:items_data._fieldsProto.public_id.stringValue,
                                name:items_data._fieldsProto.name.stringValue,
                                added_by:items_data._fieldsProto.added_by.stringValue,
                                date_of_event:items_data._fieldsProto.date_of_event.stringValue,
                            })
                break;
                case 'event_added_by':
                    res({added_by:items_data._fieldsProto.added_by.stringValue})
                break;
                case 'event_files':
                    res({files:items_data._fieldsProto.files.arrayValue.values})
                break;
                case 'avatar':
                            res({avatar:{
                                avatar_id:items_data._fieldsProto.avatar.mapValue.fields.id.stringValue,
                                avatar_path:items_data._fieldsProto.avatar.mapValue.fields.path.stringValue,
                                avatar_type:items_data._fieldsProto.avatar.mapValue.fields.type.stringValue,
                                avatar_public:items_data._fieldsProto.avatar.mapValue.fields.public.booleanValue
                            }})
                break;
                case 'item_files':
                    res({files:items_data._fieldsProto.files.arrayValue.values})
                break;
                default:
                    rej()
                break;
                }
            }
        } catch (error) {
            console.log(error)
            rej()
        }
    })
}
export{get_item_info_by_id}