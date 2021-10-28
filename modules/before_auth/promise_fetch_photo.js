import fetch from "node-fetch"

const fetch_photo = (image)=>{
    return new Promise((res,rej)=>{
        fetch(image)
            .then(res=>res.blob())
            .then((e)=>{
                res(e)
            })
            .catch((er)=>{
                res(er)
            })
    })
}
export {fetch_photo}