import {isValidDate} from '../global/validate_date.js'
const add_item_validate = (body,validate_info)=>{
    return new Promise((res,rej)=>{

        //validacja zdjec odbywa sie w innych funkcjach
        //ZROBIC VALIDACJE TYPÓW DANYCH!
        //['serial_number','seller_name','seller_adress','seller_email','phone_number_seller','phone_number_seller','item_name',
        //'brand','model','purchase_amount','warranty_start_date','warranty_end_date',]
        // validacja typów konczenia gwarancji
        if(!('warranty_time' in body) && !('warranty_end_date' in body))
            return rej('Podaj date zakończenia lub ilość lat gwarancji.')
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

        
         if('warranty_end_date' in body &&  !('warranty_time' in body)&&   !(typeof body.warranty_end_date === 'string'))//to ma miec format yyyy/mm/dd
            return rej('Data musi być formatem string.')
         if('warranty_end_date' in body && !('warranty_time' in body) &&body.warranty_end_date.length != 10)
            return rej('Data musi miec format yyyy-mm-dd')
        if('warranty_end_date' in body && !('warranty_time' in body) && !(isValidDate(body.warranty_end_date)))
            return rej('Podana data jest błędna.')


            
        //rozpoczecie gwarancji
        if(!('warranty_start_date' in body))
            return rej('Data rozpoczęcia gwarancji jest wymagana.')
        if('warranty_start_date' in body &&  !(typeof body.warranty_start_date === 'string'))
            return rej('Data rozpoczęcia gwarancji musi byc typem string.')
        if('warranty_start_date' in body && body.warranty_start_date.length != 10)
            return rej('Data rozpoczęcia musi miec format yyyy-mm-dd')
        if('warranty_start_date' in body && !(isValidDate(body.warranty_start_date)))
            return rej('Podana data jest błędna.')


        //Nazwa przedmiotu
        if(!('item_name'in body))
        return rej('Nazwa przedmiotu jest obowiązkowa.')
        if('item_name' in body && !(typeof body.item_name === 'string'))
        return rej(`Nazwa przedmiotu musi byc typem string.`)
        if('item_name' in body && body.item_name.length < validate_info.item_name_min_length)
        return rej(`Nazwa przedmiotu powinna zawierać co najmniej ${validate_info.item_name_min_length} znaków.`)
        if('item_name' in body && body.item_name.length >validate_info.item_name_max_length)
        return rej(`Nazwa przedmiotu nie może zawierać wiecej niż ${validate_info.item_name_max_length} znaków!`)

        //Marka
        if(!('brand' in body))
        return rej("Marka jest obowiązkowa")
        if('brand' in body && !(typeof body.brand === 'string'))
        return rej('Marka musi być typem string.')
        if('brand' in body && body.brand.length < validate_info.brand_min_length)
        return rej(`Marka powinna zawierać co najmniej ${validate_info.brand_min_length} znaków.`)
        if('brand' in body && body.brand.length > validate_info.brand_max_length)
        return rej(`Marka nie może zawierać wiecej niż ${validate_info.brand_max_length} znaków!`)

        //Model
        if(!('model' in body))
        return rej("Model jest obowiązkowy")
        if('model' in body && !(typeof body.model === 'string'))
        return rej('Model musi być typem string.')
        if('model' in body && body.model.length < validate_info.model_min_length)
        return rej(`Model powinien zawierać co najmniej ${validate_info.model_max_length} znaków.`)
        if('model' in body && body.model.length >validate_info.model_max_length)
        return rej(`Model nie może zawierać wiecej niż ${validate_info.model_max_length} znaków!`)

        //Kwota zakupu
        if(!('purchase_amount' in body))
        return rej('Kwota zakupu jest obowiązkowa')
        if('purchase_amount' in body && !(typeof body.purchase_amount === 'string'))
        return rej('Kwota zakupu musi byc typem string.')
        if('purchase_amount' in body && body.purchase_amount.length < validate_info.purchase_amount_min_length)
        return rej('Kwota zakupu nie może być pusta')
        if('purchase_amount' in body && body.purchase_amount.length > validate_info.purchase_amount_max_length)
        return rej(`Kwota zakupu nie może przekraczać ${validate_info.purchase_amount_max_length} znaków`)

        //numer seryjny
        if('serial_number' in body &&  !(typeof body.serial_number === 'string'))
        return rej('Numer seryjny musi byc typem string.')
        if('serial_number' in body && body.serial_number.length > serial_number_max_length)
        return rej(`Numer seryjny nie może być większy niż ${serial_number_max_length} znaków`)
        


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

            //komentarz
        if('comment' in body && !(typeof body.comment === 'string'))
            return rej('Komentarz musi być typem string.')
        if('comment' in body && body.comment.length > validate_info.comment_max_length)
            return rej(`Komentarz nie może być dłuższy niż ${validate_info.comment_max_length} znaków.`)
        return res()
    })
}
export{add_item_validate}