import pkg from 'firebase-admin'
const {storage} = pkg
const add_photo_to_storage = (img,name)=>{
    return new Promise(async(res,rej)=>{
        const arrayBuffer = await img.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const my_photo = storage().bucket()
        const my_file = my_photo.file(name)
        const my_stream = my_file.createWriteStream( {metadata: { contentType: img.type}})
        my_stream.write(buffer)
        my_stream.end()
        my_stream.on('error',()=>{
            rej()
        })
        my_stream.on('finish',()=>{
           res()
        })
    })
}
export{add_photo_to_storage}