import pkg from "firebase-admin"
const {firestore} = pkg
const add_item_to_db = (data)=>{
    return new Promise(async(res,rej)=>{
        const {private_id,public_id,images,owner,avatar,serial_number,additional_description,seller_name,seller_adress,seller_email,phone_number_seller,item_name,brand,model,purchase_amount,warranty_start_date,warranty_end_date} = data
        const dbRef =  firestore().collection("Items");
        dbRef.doc(private_id).set({
            public_id:public_id,
            images:images,
            owner:owner,
            share_with:[],
            comments:[],
            events:[],
            avatar:avatar,
            serial_number,
            additional_description,
            seller_name,
            seller_adress,
            seller_email,
            phone_number_seller,
            item_name,
            brand,
            model,
            purchase_amount,
            warranty_start_date,
            warranty_end_date
        })
        .then(()=>{res()})//dodany
        .catch((er)=>{
            console.log(er)
            rej(er)//nie udało sie dodać
        })
    })
}
export{add_item_to_db}

