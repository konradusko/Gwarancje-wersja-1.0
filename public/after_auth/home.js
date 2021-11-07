export default async function main(){
    const get_user_info = await import('./home/get_user_info.js')
    await get_user_info.default() // najpierw pobieramy zdjęcie uzytkownika
    
    //testy
    const add_item_post_request = await import ('./add_item/add_item.js')
    document.getElementById('ad_item').addEventListener('click',()=>{
        add_item.default()
    })
}