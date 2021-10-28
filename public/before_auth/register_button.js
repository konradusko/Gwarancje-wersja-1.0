export default function register_button(){
    console.log('exd')
    console.log('register')
    let img ;
    const input = document.getElementById('file');
    const onSelectFile = () => img = input.files[0];

    input.addEventListener('change', onSelectFile, false);
    document.getElementById('form')
    .addEventListener('click',(e)=>{
        console.log(img.type)
        let blob = new Blob([img],{
            type: "image/jpeg"
        })
        let reader = new FileReader();
        reader.readAsDataURL(blob); 
        reader.onload = function(e){
            fetch(reader.result)
            .then(res=>res.blob())
            .then(console.log)
            const email = document.getElementById('email').value
            const password = document.getElementById('password').value
            const name =document.getElementById('name').value
     
            let img = reader.result
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
                    img
                })
            }).then(()=>{
                console.log('good')
            })
            .catch((er)=>{
                console.log(er)
            })
        }

       
    })
}



