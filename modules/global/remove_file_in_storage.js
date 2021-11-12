
import pkg from 'firebase-admin'
const {storage} = pkg
const remove_file = ()=>{
    return new Promise((res,rej)=>{
        storage().bucket().deleteFiles({
            prefix:path
        })
        res()
    })
   
}
export{remove_file}