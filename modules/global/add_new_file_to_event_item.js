import pkg from "firebase-admin"
const {firestore} = pkg
const add_new_file_to_event_item = async(data)=>{
    const {collection,doc_id,new_to_add,current_files} = data;
    const ref =  firestore().collection(collection).doc(doc_id)
    let files_to_add =[...new_to_add]
    for(let _=0;_<current_files.length;_++){
        files_to_add.push({
            id:current_files[_].mapValue.fields.id.stringValue,
            path:current_files[_].mapValue.fields.path.stringValue,
            type:current_files[_].mapValue.fields.type.stringValue
        })
    }
    try {
        ref.update({
            files:new_files_to_add
        })
        res()
    } catch (error) {
        rej()
    }

}
export{add_new_file_to_event_item}