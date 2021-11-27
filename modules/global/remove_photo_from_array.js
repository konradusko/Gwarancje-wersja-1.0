import pkg from "firebase-admin"
const {firestore} = pkg
const remove_files_from_array_db = (data)=>{
    return new Promise((res,rej)=>{
        const {collection,doc_id,file_to_remove_id,all_file} = data;
        const ref =  firestore().collection(collection).doc(doc_id)
        const new_files = all_file.filter(post => post.mapValue.fields.id.stringValue !== file_to_remove_id)
        let new_files_to_add =[]
        for(let _=0;_<new_files.length;_++){
            new_files_to_add.push({
                id:new_files[_].mapValue.fields.id.stringValue,
                path:new_files[_].mapValue.fields.path.stringValue,
                type:new_files[_].mapValue.fields.type.stringValue
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

    })
}
export{remove_files_from_array_db}