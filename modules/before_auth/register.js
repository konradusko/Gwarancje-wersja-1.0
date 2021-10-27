import pkg from 'firebase-admin'
const {auth} = pkg
import {add_new_user_to_db} from "./add_user_to_db.js"
const register = (data)=>{
    /*
    data --> obiekt ktory na w sobie wartości do rejestracji
    */
    return new Promise(async(res,rej)=>{
        //validacja
        if(data.name.length <4)
        rej('Nazwa użytkownika powinna zawierać co najmniej 4 znaki.')
        if(data.password.length<6)
        rej('Hasło powinno zawierać co najmniej 6 znaków !')
        try {
            const user =  await auth.createUser({
                email:data.email,
                password:data.password,
                displayName:data.name
            })
            console.log('Successfully created new user:', user.uid);
            try {
                 await add_new_user_to_db(user.uid)
                 res()//git
            } catch (error) {
                console.log(error)
                console.log('jest blad nie dodalo i co teraz zrobic')
            }
        } catch (error) {
            console.log(error.errorInfo.message)
            if(error.errorInfo.message === "The email address is already in use by another account.")
            rej('Ten email jest już zajęty !')
            rej(error)
        }
     
    })
}
export {register}