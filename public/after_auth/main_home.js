export default async function home_main_after_auth(){
    console.log('home po zalogowaniu')
    document.getElementById("logout").addEventListener('click',()=>{
        firebase.auth().signOut().then(()=>{
                    console.log('wylogowany')
                })
    })
}