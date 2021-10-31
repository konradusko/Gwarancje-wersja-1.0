import pkg from 'firebase-admin'
const {auth} = pkg
import {add_new_user_to_db} from "./add_user_to_db.js"
import {add_photo_to_storage_register} from './add_photo_to_storage.js'
import {makeId} from "../global/makeId.js"
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
            const url_name_photo = `UsersPhotos/${user.uid}/user_photo.${(data.img.type).split('/')[1]}`
            try {
                await add_photo_to_storage_register(data.img,url_name_photo) // próbujemy dodac obrazek do firestore

                try {
                    await add_new_user_to_db(user.uid,url_name_photo)
                    res()//git
               } catch (error) {
                   //tutaj nalezy usunac usera bo jakims cudem nie dodał sie do bazy danych 
                   await auth().deleteUser(user.uid).then((result)=>{
                       rej("Utworzenie konta nie powiodło się !")
                   })
               }
            }catch(err){
                
            }
         
        } catch (error) {
            if("errorInfo"in error && "message"in error.errorInfo &&error.errorInfo.message === "The email address is already in use by another account.")
            rej('Ten email jest już zajęty !')
            rej("Utworzenie konta nie powiodło się !")
        }
     
    })
}
export {register}