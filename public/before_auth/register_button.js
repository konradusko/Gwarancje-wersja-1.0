export default function register_button(){
    console.log('exd')
    document.getElementById('form')
    .addEventListener('click',(e)=>{
        console.log('xd')
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const name =document.getElementById('name').value
        fetch('/registerUser',{
            method:"POST",
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                email,
                password,
                name,
            })
        }).then(()=>{
            console.log('good')
        })
        .catch((er)=>{
            console.log(er)
        })
    })
}



