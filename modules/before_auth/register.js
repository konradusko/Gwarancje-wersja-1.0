import pkg from 'firebase-admin'
const {auth} = pkg
import {add_new_user_to_db} from "./add_user_to_db.js"
import {add_photo_to_storage_register} from '../global/add_photo_to_storage.js'
import {makeId} from "../global/makeId.js"
const register = (data)=>{
    /*
    data --> obiekt ktory na w sobie wartości do rejestracji
    */
    return new Promise(async(res,rej)=>{
        //validacja

        const add_user = async (url,uid)=>{
            try {
                await add_new_user_to_db(uid,url)
                res()//git
           } catch (error) {
               //tutaj nalezy usunac usera bo jakims cudem nie dodał sie do bazy danych 
               await auth().deleteUser(uid).then((result)=>{
                   rej("Utworzenie konta nie powiodło się !")
               })
           }
        }
        try {
            const user =  await auth().createUser({
                email:data.email,
                password:data.password,
                displayName:data.name
            })
            switch (data.img) {
                case 1:
                    add_user('PATH TO URL',user.uid)
                    break;
                case 2:
                    add_user('PATH TO URL',user.uid)
                    break;
                 case 3:
                    add_user('PATH TO URL',user.uid)
                    break;
                default:
                    const url_name_photo = `UsersPhotos/${user.uid}/user_photo.${(data.img.type).split('/')[1]}`
                    try {
                        await add_photo_to_storage_register(data.img,url_name_photo) // próbujemy dodac obrazek do firestore
                        add_user(url_name_photo,user.uid)
                    }catch(err){
                        add_user('default user photo url',user.uid)//nie udalo sie dodac obrazka wiec wybierzemy defaultowy i dalej utworzymy konto
                    }
                    break;
            }
           
         
        } catch (error) {
            if("errorInfo"in error && "message"in error.errorInfo &&error.errorInfo.message === "The email address is already in use by another account.")
            rej('Ten email jest już zajęty !')
            rej("Utworzenie konta nie powiodło się !")
        }
     
    })
}
export {register}