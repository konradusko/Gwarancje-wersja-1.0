
import pkg from 'firebase-admin'
const {storage} = pkg
const remove_file = (path)=>{
    return new Promise((res,rej)=>{
        storage().bucket().deleteFiles({
            prefix:path
        }).then(()=>{
            res()
        })
        .catch((er)=>{
            //jakies logi robić
            res()
        })
    })
   
}
export{remove_file}