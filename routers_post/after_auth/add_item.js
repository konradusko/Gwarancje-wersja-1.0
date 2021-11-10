import express from "express"
const add_item = express.Router()
import {get_user_info_from_db} from "../../modules/after_auth/get_users_info.js"
import {add_item_validate} from '../../modules/after_auth/add_item_validate.js'
import {fetch_photo} from '../../modules/global/promise_fetch_photo.js'
import {add_item_to_db} from '../../modules/after_auth/add_item_to_db.js'
import {makeId} from "../../modules/global/makeId.js"
import {create_pdf_file} from "../../modules/global/create_pdf_file.js"
add_item.post('/add_item',async(req,res)=>{
    try {
    let tmp;
    const max_size = 2100000 // bajty
    const {slots} = await get_user_info_from_db({uid:res.locals.user.uid,case:"slots"})
    console.log(slots)
        if(slots !=0 &&Math.sign(slots) != -1){
            console.log(slots)
            //tutaj zrobić validacje potem
            //czego potrzebuje
            //zrobić validacje
            //potem sprawdzić zdjęcia

            //1. validacja danych czy wszystko mamy i wszystko jest jak powinno byc
            try {
                
                const validate_item = await add_item_validate()

                let img_proof_img =[],img_proof_pdf=[]
                //2. validacje plików które chcemy dodać
                for(let _=0;_<3;_++){
                    //dla wszystkich sprawdzam czy rozmiar jest poprawny etc
                    tmp = await fetch_photo()//dać tutaj zdjęcie
                    if(tmp.type == "image/jpeg" || tmp.type == "image/png"||tmp.type == "image/jpg" || tmp.type == 'application/pdf'){
                        if(tmp.size > max_size){
                            return res.json({message:"Zdjęcie jest za duże"})
                        }else{
                            if(tmp.type =='application/pdf')
                            img_proof_pdf.push({
                                type:tmp.type,
                                code:'xd'
                            })
                            if(tmp.type == "image/jpeg" || tmp.type == "image/png"||tmp.type == "image/jpg")
                            img_proof_img.push({
                                type:tmp.type,
                                code:'xd'
                            })
                        }
                    }else{
                        return res.json({message:'Zdjęcie ma zły format'})
                    }

                }
                const public_id = await makeId(30)
                const private_id = `${await makeId(15)}.${public_id}.${await makeId(10)}`

                //tworzenie pdfów
                try {
                    tmp=undefined
                    if(img_proof_img.length !=0){
                        for(let z =0;z<img_proof_img.length;z++){
                            tmp = await create_pdf_file({
                                password:password,
                                img:img_proof_img[z].code
                            })
                            img_proof_img[z].code = tmp
                        }
                    }

                    if(img_proof_pdf.length !=0){

                    }



                    // Stworzyc item
                    try {
                        const created_item = await add_item_to_db()

                    } catch (error) {
                        return res.json({message:"Dodawanie przedmiotu nie powiodło się"})
                    }
                } catch (error) {
                    
                }

                

                //3.Stworzyc pdf'y hasła i dodać je do storage






            } catch (error) {
                return res.json({message:error})
            }

        }else{
            return res.json({message:"Brak wolnych slotów, dokup je"})
        }
    } catch (error) {
        return res.status(500).json({message:"Error 500 Internal server error"})
    }
})
export{add_item}