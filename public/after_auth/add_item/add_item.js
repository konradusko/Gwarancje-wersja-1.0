export default function add_item(){
    console.log('xd')
    firebase.auth().currentUser.getIdToken()
    .then((token)=>{
        fetch("/add_item",{
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
}