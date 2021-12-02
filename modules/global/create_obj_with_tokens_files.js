import {create_token_photo} from '../global/access_token_photo.js'
const create_obj_with_tokens_files = (data)=>{
    return new Promise(async(res,rej)=>{
        const {array_of_items,minutes} = data;
        let tmp;
        let array_to_response=[];
        for(let _=0;_<array_of_items.length;_++){
            try {
                tmp = (await create_token_photo(array_of_items[_].mapValue.fields.path.stringValue,minutes))[0]
                array_to_response.push({
                    id:array_of_items[_].mapValue.fields.id.stringValue,
                    path:tmp,
                    type:array_of_items[_].mapValue.fields.type.stringValue
                })
            } catch (error) {
                array_to_response.push({
                    id:array_of_items[_].mapValue.fields.id.stringValue,
                    path:undefined,
                    type:array_of_items[_].mapValue.fields.type.stringValue
                })
            }
        }
       return res(array_to_response)
    })
}
export{create_obj_with_tokens_files}