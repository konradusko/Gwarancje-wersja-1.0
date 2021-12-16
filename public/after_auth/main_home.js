export default async function home_main_after_auth(){
    const home = await import('./home.js')
    home.default()
    document.getElementById('logout').addEventListener('click',()=>{
        firebase.auth().signOut().then(()=>{
                    console.log('wylogowany')
                })
    })
}