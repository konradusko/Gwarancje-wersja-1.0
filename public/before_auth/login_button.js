export default function login_button(){
    document.getElementById('click').addEventListener('click',()=>{
        console.log('xdd')
        const email = "qwerty123456@gmail.com"
        const password = "123456"
         firebase.auth().signInWithEmailAndPassword(email,password)
                .then((e)=>{})
                .catch((er)=>{
                    console.log(er)
                    //wyswietlic error
                })
    })
    

}

      