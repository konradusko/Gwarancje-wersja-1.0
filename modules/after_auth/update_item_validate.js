import {isValidDate} from '../global/validate_date.js'
import {isHtml} from '../global/is_html_in_text.js'
const validate_update_item = (data)=>{
    return new Promise((res,rej)=>{
     const {body,validate_info} = data;


        if('warranty_time' in body && 'warranty_end_date' in body)
        return rej('Nie możesz podawać ilości lat i daty zakończenia jednocześnie')


        if('warranty_time' in body && !('warranty_end_date' in body) &&  !(typeof body.warranty_time === 'string'))//jest time ale nie ma konczącej sie daty
            return rej('Czas musi byc typem string')
        if('warranty_time' in body && !('warranty_end_date' in body)  && !(body.warranty_time.includes('/')))
            return rej('Czas musi miec format Y/MM')
        if('warranty_time' in body && !('warranty_end_date' in body) && body.warranty_time.split('/')[0] == '' ||'warranty_time' in body && !('warranty_end_date' in body) && body.warranty_time.split('/')[1] == '')
            return rej('Musisz podac czas')
        if('warranty_time' in body && !('warranty_end_date' in body) && isNaN(body.warranty_time.split('/')[0]) || 'warranty_time' in body && !('warranty_end_date' in body) && isNaN(body.warranty_time.split('/')[1]))
            return rej('Wartośc czasu musi być liczbą')
        if('warranty_time' in body && !('warranty_end_date' in body) && !(parseInt(body.warranty_time.split('/')[1]) >=0 && parseInt(body.warranty_time.split('/')[1]) <=12 ))
            return rej('Wartość miesiąca musi byc pomiedzy 0-12')
        if('warranty_time' in body && !('warranty_end_date' in body) && isHtml(body.warranty_time))
            return rej('Czas zawiera niedozwolone znaki.')

         //koniec gwarancji
         if('warranty_end_date' in body &&  !('warranty_time' in body)&&   !(typeof body.warranty_end_date === 'string'))//to ma miec format yyyy/mm/dd
            return rej('Data musi być formatem string.')
         if('warranty_end_date' in body && !('warranty_time' in body) &&body.warranty_end_date.length != 10)
            return rej('Data musi miec format yyyy-mm-dd')
        if('warranty_end_date' in body && !('warranty_time' in body) && !(isValidDate(body.warranty_end_date)))
            return rej(`Podana data jest błędna. Data musi miec format yyyy-mm-dd.`)
        if('warranty_end_date' in body && !('warranty_time' in body) && isHtml(body.warranty_end_date))
            return rej('Data zakończenia zawiera niedozwolone znaki.')
            
            //komentarz
        if('comment' in body && !(typeof body.comment === 'string'))
            return rej('Komentarz musi być typem string.')
        if('comment' in body && body.comment.length > validate_info.comment_max_length)
            return rej(`Komentarz nie może być dłuższy niż ${validate_info.comment_max_length} znaków.`)
        if('comment' in body && isHtml(body.comment))
            return rej('Komentarz zawiera niedozwolone znaki.')
        
        //nazwa sprzedawcy
        if('seller_name' in body && !(typeof body.seller_name === 'string'))
            return rej('Nazwa sprzedawcy musi być typem string.')
        if('seller_name' in body && body.seller_name.length > validate_info.seller_adress_max_length)
            return rej(`Nazwa sprzedawcy nie może być dłuższa niż ${validate_info.seller_adress_max_length} znaków.`)
        if('seller_name' in body && isHtml(body.seller_name))
            return rej('Nazwa sprzedawcy zawiera niedozwolone znaki.')

        //adres sprzedawcy
        if('seller_adress' in body && !(typeof body.seller_adress === 'string'))
            return rej('Adres sprzedawcy musi byc typem string.')
        if('seller_adress' in body &&  body.seller_adress.length > validate_info.seller_adress_max_length)
            return rej(`Adres sprzedawcy nie może byc dłuższy niż ${validate_info.seller_adress_max_length} znaków.`)
        if('seller_adress' in body && isHtml(body.seller_adress))
            return rej('Adres sprzedawcy zawiera niedozwolone znaki.')

        //email sprzedawcy
        if('seller_email' in body && !(typeof body.seller_email === 'string'))
            return rej('Email sprzedawcy musi byc typem string.')
        if('seller_email' in body &&  body.seller_email.length > validate_info.seller_email_max_length)
            return rej(`Email sprzedawcy nie może być dłuższy niż ${validate_info.seller_email_max_length} znaków.`)
        if('seller_email' in body && isHtml(body.seller_email))
            return rej('Email sprzedawcy zawiera niedozwolone znaki.')

        //numer telefonu sprzedawcy
        if('phone_number_seller' in body && !(typeof body.phone_number_seller === 'string'))
            return rej('Numer telefonu musi byc typem string.')
        if('phone_number_seller' in body &&  body.phone_number_seller.length > validate_info.phone_number_seller_max_length)
            return rej(`Numer telefonu nie może być dłuższy niż ${validate_info.phone_number_seller_max_length} znaków.`)
        if('phone_number_seller' in body && isHtml(body.phone_number_seller))
            return rej('Numer telefonu zawiera niedozwolone znaki.')
        //kwota zakupu
        if('purchase_amount' in body && !(typeof body.purchase_amount === 'string'))
            return rej('Kwota zakupu musi byc typem string.')
        if('purchase_amount' in body && body.purchase_amount.length < validate_info.purchase_amount_min_length)
            return rej('Kwota zakupu nie może być pusta')
        if('purchase_amount' in body && body.purchase_amount.length > validate_info.purchase_amount_max_length)
            return rej(`Kwota zakupu nie może przekraczać ${validate_info.purchase_amount_max_length} znaków`)
        if('purchase_amount' in body && isHtml(body.purchase_amount))
            return rej('Kwota zakupu zawiera niedozwolone znaki.')
       
        //numer seryjny
        if('serial_number' in body  && !(typeof body.serial_number === 'string'))
            return rej('Numer seryjny musi byc typem string.')
        if('serial_number' in body &&  body.serial_number.length > validate_info.serial_number_max_length)
            return rej(`Numer seryjny nie może być dłuższy niż ${validate_info.serial_number_max_length} znaków.`)
        if('serial_number' in body && isHtml(body.serial_number))
            return rej('Number seryjny zawiera niedozwolone znaki.')
        return res()//wszystko git
    })
}
export{validate_update_item}