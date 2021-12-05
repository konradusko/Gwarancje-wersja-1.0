import {isValidDate} from '../global/validate_date.js'
const validate_update_item = (data)=>{
    return new Promise((res,rej)=>{
     const {body,validate_info} = data;

         //koniec gwarancji
        if('warranty_end_date' in body && !(typeof body.warranty_end_date === 'string'))//to ma miec format yyyy/mm/dd
            return rej('Data musi być formatem string.')
        if('warranty_end_date' in body &&body.warranty_end_date.length != 10 && !(isValidDate(body.warranty_end_date)))
            return rej('Data musi miec format yyyy-mm-dd.')


            //komentarz
        if('comment' in body && !(typeof body.comment === 'string'))
            return rej('Komentarz musi być typem string.')
        if('comment' in body && body.comment.length > validate_info.comment_max_length)
            return rej(`Komentarz nie może być dłuższy niż ${validate_info.comment_max_length} znaków.`)
        
        //nazwa sprzedawcy
        if('seller_name' in body && !(typeof body.comment === 'string'))
            return rej('Nazwa sprzedawcy musi być typem string.')
        if('seller_name' in body && body.seller_name.length > validate_info.seller_adress_max_length)
            return rej(`Nazwa sprzedawcy nie może być dłuższa niż ${validate_info.seller_adress_max_length} znaków.`)

        //adres sprzedawcy
        if('seller_adress' in body && !(typeof body.seller_adress === 'string'))
            return rej('Adres sprzedawcy musi byc typem string.')
        if('seller_adress' in body &&  body.seller_adress.length > validate_info.seller_adress_max_length)
            return rej(`Adres sprzedawcy nie może byc dłuższy niż ${validate_info.seller_adress_max_length} znaków.`)

        //email sprzedawcy
        if('seller_email' in body && !(typeof body.seller_email === 'string'))
            return rej('Email sprzedawcy musi byc typem string.')
        if('seller_email' in body &&  body.seller_email.length > validate_info.seller_email_max_length)
            return rej(`Email sprzedawcy nie może być dłuższy niż ${validate_info.seller_email_max_length} znaków.`)

        //numer telefonu sprzedawcy
        if('phone_number_seller' in body && !(typeof body.phone_number_seller === 'string'))
            return rej('Numer telefonu musi byc typem string.')
        if('phone_number_seller' in body &&  body.phone_number_seller.length > validate_info.phone_number_seller_max_length)
            return rej(`Numer telefonu nie może być dłuższy niż ${validate_info.phone_number_seller_max_length} znaków.`)

        //kwota zakupu
        if('purchase_amount' in body && !(typeof body.purchase_amount === 'string'))
            return rej('Kwota zakupu musi byc typem string.')
        if('purchase_amount' in body &&  body.purchase_amount.length > validate_info.purchase_amount_max_length)
            return rej(`Kwota zakupu nie może być dłuższa niż ${validate_info.purchase_amount_max_length} znaków.`)
       
        //numer seryjny
        if('serial_number' in body  && !(typeof body.serial_number === 'string'))
            return rej('Numer seryjny musi byc typem string.')
        if('serial_number' in body &&  body.serial_number.length > validate_info.serial_number_max_length)
            return rej(`Numer seryjny nie może być dłuższy niż ${validate_info.serial_number_max_length} znaków.`)

        res()//wszystko git
    })
}
export{validate_update_item}