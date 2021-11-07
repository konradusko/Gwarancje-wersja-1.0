//TO DO
//VALIDACJE ZDJECIA CZY JEST ROZNE OD undefined

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
        const name_minimum_length = 4,name_max_length = 25,password_minimum_length = 6
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const name =document.getElementById('name').value
        const reg_exp_mail_validate =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const validate_email = reg_exp_mail_validate.test(String(req.body.email).toLowerCase()) == true? true:false
        if(!validate_email)
        console.log('wyswietlic ze email jest zły !')
        if(name.length <name_minimum_length)
        console.log('wyswietlic ze nazwa jest za krótka')
        if(name.length > name_max_length)
        console.log('wyswietlic ze nazwa jest za długa')
        if(password.length < password_minimum_length)
        console.log('wyswietlic ze hasło jest za krótkie')
        if(validate_email && name.length > name_minimum_length &&name.length < name_max_length&&password.length > password_minimum_length){
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
        }
      
    })
    })
}



