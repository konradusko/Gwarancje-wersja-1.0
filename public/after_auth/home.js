export default async function main(){
    const get_user_info = await import('./home/get_user_info.js')
    await get_user_info.default() // najpierw pobieramy zdjęcie uzytkownika
    
    //testy
    const add_item_post_request = await import ('./add_item/add_item.js')
    // add_item_post_request.default()
//     document.getElementById("test_add_item").addEventListener("click",async()=>{
//         console.log('xd')
//         const add_file = await import('../public/add_file.js')
//            const {default:type_of_file} = await import('../public/type_of_files.js')
//     let img = undefined;
//     const allow_format = ["image/jpeg","image/png","application/pdf"]
//         try {
//             img = await add_file.default(allow_format,type_of_file)
//             console.log(img)
//         } catch (error) {
//            img = undefined
//             //wyswietlic błąd
//         }

// })


firebase.auth().currentUser.getIdToken()
.then((token)=>{
    console.log('XD')
    fetch("/addItemEvent",{
        method:"POST",
        headers:{
            Accept: "application/json",
        "Content-Type": "application/json",
        },
        body:JSON.stringify({
            token,
            public_id_item:'Ovt00hdrPGPO2s3QRoNi'

        })
})
.then(response => response.json()) // convert to json
.then((json)=>{
    console.log(json)
})
})
.catch((er)=>{
    console.log(er)
})
}