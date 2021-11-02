import pkg from 'firebase-admin'
const {storage} = pkg
const create_token_photo = (file,time)=>{
    return new Promise(async(res,rej)=>{
        const my_photo = storage().bucket().file(file)
        if(my_photo.exists()){
            const create_minutes = time*60000
            const url = await  my_photo.getSignedUrl({
                version: "v4",
                action: "read",
                expires: Date.now() + create_minutes,
            })
            res(url)
        }else{
            rej('Zdjęcie nie istnieje!')
        }
    })
}
export{create_token_photo}