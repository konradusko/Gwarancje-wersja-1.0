export default function get_user_info(){
    return new Promise((res,rej)=>{
        console.log('xddddd')
        firebase.auth().currentUser.getIdToken()
            .then((token)=>{
            fetch("/getUserInfo",{
                method:"POST",
                headers:{
                    Accept: "application/json",
                   "Content-Type": "application/json",
                },
                body:JSON.stringify({token})
            })
            .then(response => response.json()) // convert to json
            .then((json)=>{
                console.log(json)
            })
         })
            .catch((er)=>{
                console.log(er)
            })
         
    })
}