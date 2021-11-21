export default async function main_item (){
    console.log('item xd')
    const code = new URL(window.location.href).searchParams.get("item_id")
    console.log(code)
    firebase.auth().currentUser.getIdToken()
    .then((token)=>{
        fetch("/getItem",{
            method:"POST",
            headers:{
                Accept: "application/json",
            "Content-Type": "application/json",
            },
            body:JSON.stringify({
                token,
                public_id_item:code
    
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