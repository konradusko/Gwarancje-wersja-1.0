export default async function register_button(){
    const add_file = await import('../public/add_file.js')
    const {default:type_of_file} = await import('../public/type_of_files.js')
    let img = undefined;
    const allow_format = ["image/jpeg","image/png"]
    const button_add_file = document.getElementById('file');
    button_add_file.addEventListener('click',async()=>{
        try {
            img = await add_file.default(allow_format,type_of_file)
        } catch (error) {
           img = undefined
            //wyswietlic błąd
        }
document.getElementById('form')
    .addEventListener('click',(e)=>{
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
                    img
                })
            })
            .then(response => response.json()) // convert to json
            .then((json)=>{
                console.log(json)
                console.log('good')
            })
            .catch((er)=>{
                console.log(er)
            })
    })
    })

    // console.log('exd')
    // console.log('register')
    // let img ;
    // const input = document.getElementById('file');
    // const onSelectFile = () => img = input.files[0];

    // input.addEventListener('change', onSelectFile, false);
    // document.getElementById('form')
    // .addEventListener('click',(e)=>{
        
    //     console.log(img.type)
    //     let blob = new Blob([img],{
    //         type: "image/jpeg"
    //     })
    //     let reader = new FileReader();
    //     reader.readAsDataURL(blob); 
    //     reader.onload = function(e){
    //         fetch(reader.result)
    //         .then(res=>res.blob())
    //         .then(console.log)
    //         const email = document.getElementById('email').value
    //         const password = document.getElementById('password').value
    //         const name =document.getElementById('name').value
     
    //         let img = reader.result
    //         fetch('/registerUser',{
    //             method:"POST",
    //             headers:{
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //             },
    //             body:JSON.stringify({
    //                 email,
    //                 password,
    //                 name,
    //                 img
    //             })
    //         })
    //         .then(response => response.json()) // convert to json
    //         .then((json)=>{
    //             console.log(json)
    //             console.log('good')
    //         })
    //         .catch((er)=>{
    //             console.log(er)
    //         })
    //     }

       
    // })
}



