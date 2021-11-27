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


// firebase.auth().currentUser.getIdToken()
// .then((token)=>{
//     fetch("/addItemEvent",{
//         method:"POST",
//         headers:{
//             Accept: "application/json",
//         "Content-Type": "application/json",
//         },
//         body:JSON.stringify({
//             token,
//             public_id_item:'t1RbsDSsdLPXAD9MYrjK',
//             date:'1998/09/09',
//             description:'rfdsfdsfds',
//             name:'dasdsad',
//             files:['data:image/jpeg;base64,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']

//         })
// })
// .then(response => response.json()) // convert to json
// .then((json)=>{
//     console.log(json)
// })
// })
// .catch((er)=>{
//     console.log(er)
// })






// firebase.auth().currentUser.getIdToken()
// .then((token)=>{
//     fetch("/removeUserAvatar",{
//         method:"POST",
//         headers:{
//             Accept: "application/json",
//         "Content-Type": "application/json",
//         },
//         body:JSON.stringify({
//             token,
//             avatar_id:'dewq321'
            

//         })
// })
// .then(response => response.json()) // convert to json
// .then((json)=>{
//     console.log(json)
// })
// })
// .catch((er)=>{
//     console.log(er)
// })


firebase.auth().currentUser.getIdToken()
.then((token)=>{
    fetch("/removeItemFiles",{
        method:"POST",
        headers:{
            Accept: "application/json",
        "Content-Type": "application/json",
        },
        body:JSON.stringify({
            token,
            public_id_item:"i5nf0yblAKYCnI8DRjhh",
            item_photo_id_to_del:"Ygt1P9qTcK"
            

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