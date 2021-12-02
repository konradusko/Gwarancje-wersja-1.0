import pkg from 'firebase-admin'
const {auth} = pkg
import {add_new_user_to_db} from "./add_user_to_db.js"
import {add_photo_to_storage} from '../global/add_photo_to_storage.js'
import {makeId} from "../global/makeId.js"
const register = (data)=>{
    /*
    data --> obiekt ktory na w sobie wartości do rejestracji
    */
    return new Promise(async(res,rej)=>{
        //validacja
        let user={};

        const add_user = async (avatar,uid)=>{
            try {
                await add_new_user_to_db(uid,avatar)
               return res()//git
           } catch (error) {
               //tutaj nalezy usunac usera bo jakims cudem nie dodał sie do bazy danych 
               await auth().deleteUser(uid).then((result)=>{
                  return rej("Utworzenie konta nie powiodło się !")
               })
           }
        }
        try {
             user =  await auth().createUser({
                email:data.email,
                password:data.password,
                displayName:data.name
            })
            switch (data.avatar) {
                case 1:
                case '1':
                    add_user({
                        path:'url',
                        id:await makeId(10),
                        type:'type',
                        public:true
                    },user.uid)
                    break;
                case 2:
                case '2':
                    add_user({
                        path:'url',
                        id:await makeId(10),
                        type:'type',
                        public:true
                    },user.uid)
                    break;
                 case 3:
                case '3':
                    add_user({
                        path:'url',
                        id:await makeId(10),
                        type:'type',
                        public:true
                    },user.uid)
                    break;
                default:

                    const url_name_photo = (data.avatar.type == "image/jpeg" || data.avatar.type == "image/jpg")?`UsersPhotos/${user.uid}/user_photo.jpg`:`UsersPhotos/${user.uid}/user_photo.png`
                    try {
                        await add_photo_to_storage(data.avatar,url_name_photo) // próbujemy dodac obrazek do firestore
                        add_user({
                            path:url,
                            id:await makeId(10),
                            type:data.avatar.type,
                            public:false
                        },user.uid)
                    }catch(err){
                        add_user({
                            path:'url',
                            id:await makeId(10),
                            type:'type',
                            public:true
                        },user.uid)//nie udalo sie dodac obrazka wiec wybierzemy defaultowy i dalej utworzymy konto
                    }
                    break;
            }
           
         
        } catch (error) {
            if("errorInfo"in error && "message"in error.errorInfo &&error.errorInfo.message === "The email address is already in use by another account.")
            rej('Ten email jest już zajęty !')
            if('uid' in user){
                await auth().deleteUser(user.uid).then((result)=>{
                    rej("Utworzenie konta nie powiodło się !")
                })
                .catch((er)=>{
                    rej("Utworzenie konta nie powiodło się !") 
                })
            }
            rej("Utworzenie konta nie powiodło się !")
        }
     
    })
}
export {register}