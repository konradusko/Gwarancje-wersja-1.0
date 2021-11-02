const engine = async (urlPath)=>{
    const firebaseConfig = {
        apiKey: "AIzaSyBsiq48Spvfq6OsV0CalQFJi6Gd8NAQFu4",
        authDomain: "paragonytest-7d604.firebaseapp.com",
        projectId: "paragonytest-7d604",
        storageBucket: "paragonytest-7d604.appspot.com",
        messagingSenderId: "512522830802",
        appId: "1:512522830802:web:c84b68993f02e37b5cfe0b",
        measurementId: "G-E9C8GS5ZS1"
    };
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged(async (user) => {
        const get_token = (token_given)=>{
            return new Promise((res,rej)=>{
                if(token_given != null){
                    firebase.auth().currentUser.getIdToken().then((token)=>{
                       res(token)
                    })
                }else if(token_given == null){
                    res(token_given)
                }
           
            })
        }
        const check_user = (user != null)? user.getIdToken(true):null
        const token = await get_token(check_user)
        console.log(token)
        console.log(urlPath)
        fetch(urlPath,{
        method:"POST",
        headers:{
            Accept: "application/json",
           "Content-Type": "application/json",
        },
        body:JSON.stringify({token})
    })
    .then(response => response.json()) // convert to json
    .then(async(json)=>{
        console.log(json)
        if("error" in json)
        location.href = json.redirect
        if("template" in json){
            document.getElementById('content').innerHTML=json.template
        }
        if("javascript_href" in json){
            //zaimportować javascript
            const module = await import(json.javascript_href)
            module.default()
        }
        
    }).catch((er)=>{
        console.log(er)
    })
    })
}
