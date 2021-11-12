export default async function main(){
    const get_user_info = await import('./home/get_user_info.js')
    await get_user_info.default() // najpierw pobieramy zdjęcie uzytkownika
    
    //testy
    const add_item_post_request = await import ('./add_item/add_item.js')
    add_item_post_request.default()
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
    
}