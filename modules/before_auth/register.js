import pkg from 'firebase-admin'
const {auth} = pkg
import {add_new_user_to_db} from "./add_user_to_db.js"
const register = (data)=>{
    /*
    data --> obiekt ktory na w sobie wartości do rejestracji
    */
    return new Promise(async(res,rej)=>{
        //validacja
        try {
            const user =  await auth().createUser({
                email:data.email,
                password:data.password,
                displayName:data.name
            })
            try {
                 await add_new_user_to_db(user.uid,data.img)
                 res()//git
            } catch (error) {
                //tutaj nalezy usunac usera bo jakims cudem nie dodał sie do bazy danych 
                await auth().deleteUser(user.uid).then((result)=>{
                    rej("Utworzenie konta nie powiodło się !")
                })
            }
        } catch (error) {
            if("errorInfo"in error && "message"in error.errorInfo &&error.errorInfo.message === "The email address is already in use by another account.")
            rej('Ten email jest już zajęty !')
            rej("Utworzenie konta nie powiodło się !")
        }
     
    })
}
export {register}