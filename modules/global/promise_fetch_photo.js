import fetch from "node-fetch"

const fetch_photo = (image)=>{
    return new Promise((res,rej)=>{
        fetch(image)
            .then(res=>res.blob())
            .then((e)=>{
                res(e)
            })
            .catch((er)=>{
                rej("Zdjęcie ma zły format bądz jest uszkodzone!")
            })
    })
}
export {fetch_photo}