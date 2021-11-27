import express from "express"
const add_new_avatar_to_itemPOSTREQ = express.Router()
import {check_avatar_type} from '../../modules/after_auth/check_avatar.js'
import {get_item_info_by_id} from '../../modules/global/get_item_info_by_id.js'
add_new_avatar_to_itemPOSTREQ.post('/addNewAvatarItem',async(req,res)=>{
    const uid = res.locals.user.uid;
    const item_id = res.locals.item_id;
    const max_size = res.locals.max_size_file // bajty

    const add_avatar = async(blob)=>{
        try {
            const path = `Items/${item_id}/`
           const avatar_to_add =  await check_format_and_add_avatar({obj:blob,path})//dodajemy zdj do storage
           try {
                await add_new_avatar({uid:uid,avatar:avatar_to_add,collection:'Items'})
                return res.json({message:"Avatar zostal zmieniony."})
           } catch (error) {
               await remove_file(avatar_to_add.path)
               return res.json({message:"Nie udało się dodać avataru."})
           }
        } catch (error) {
            return res.json({message:"Nie udało się dodać avataru."})
        }
    }

    try {
        //sprawdzam czy jest avatar_i czy ew ma odpowiedni format i rozmiar zwraca blob type
        const is_avatar =  await check_avatar_type({body:req.body,allow_format:['image/jpeg',"image/png","image/jpg"],max_size:max_size})
        if(is_avatar === null)
        return res.json({message:'Brakuje avataru.'})
        if('avatar_id' in req.body){
            try {
                const {avatar} = await get_item_info_by_id({id:item_id,action:"avatar",collection_name:'Items'})
                if(avatar.avatar_id != req.body.avatar_id)
                return res.json({message:"Nie istnieje taki avatar."})
    
                if(avatar.avatar_public === true)
                    add_avatar(is_avatar)//jest publiczne to aby dodajemy 
                
    
                if(avatar.avatar_public != true){
                    //japierw dodam jako publiczne
                    const public_avatar = { // publiczny avatar
                        path:'url',
                        id:await makeId(10),
                        type:'type',
                        public:true
                    }
                    //najpierw trzeba usunac stary
                    try {
                        await add_new_avatar({uid:uid,avatar:public_avatar,collection:'Items'})
                        await remove_file(avatar.avatar_path)
                        add_avatar(is_avatar)
                    } catch (error) {
                        return res.json({message:'Nie udało się dodać avatara'})
                    }
                }
            } catch (error) {
                return res.json({message:"Coś poszło nie tak."})
            }
        }
    
        if(!('avatar_id' in req.body))
        return res.json({message:"Brakuje id avataru."})
    } catch (error) {
        return res.json({message:error})
    }
    
})
export{add_new_avatar_to_itemPOSTREQ}