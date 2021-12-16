import {types_of_files} from './types_of_files.js'
const check_photo_format = (blob)=>{
    return new Promise( async (res,rej)=>{
            try {
                const arr = (new Uint8Array(await blob.arrayBuffer())).subarray(0, 4);
                let header = ""
                for(let i =0; i<arr.length;i++){
                    header += arr[i].toString(16);
                }
                const format = types_of_files(header)
                res(format)
            } catch (error) {
                rej()
            }
     

    })
}
export{check_photo_format}