

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
        if('warranty_time' in body && !('warranty_end_date' in body) && body.warranty_time.split('/')[0] == '' && body.warranty_time.split('/')[1] == '')
            return rej('Musisz podac czas')
        if('warranty_time' in body && !('warranty_end_date' in body) && isNaN(body.warranty_time.split('/')[0]) || 'warranty_time' in body && !('warranty_end_date' in body) && isNaN(body.warranty_time.split('/')[1]))
            return rej('Wartośc czasu musi być liczbą')
        if('warranty_time' in body && !('warranty_end_date' in body) && !(parseInt(body.warranty_time.split('/')[1]) >=0 && parseInt(body.warranty_time.split('/')[1]) <=12 ))
            return rej('Wartość miesiąca musi byc pomiedzy 0-12')

        
         if('warranty_end_date' in body &&  !('warranty_time' in body)&&   !(typeof body.warranty_end_date === 'string'))//to ma miec format yyyy/mm/dd
            return rej('Data musi być formatem string.')
        if('warranty_end_date' in body && !('warranty_time' in body) &&body.warranty_end_date.length != 10 )
            return rej('Data musi miec format yyyy/mm/dd.')
        if('warranty_end_date' in body &&  isNaN(Date.parse(body.warranty_end_date)))//zrobic lepsza walidacje czasu //sprawdzic czy zawiera \\ i czy kazda wartosc jest liczba no i przedzialy czasu
            return rej('Podana wartość nie jest data.')


        //Nazwa przedmiotu
        const item_name_min_length = 4,item_name_max_length = 30
        if(!('item_name'in body))
        return rej('Nazwa przedmiotu jest obowiązkowa.')
        if('item_name' in body && body.item_name.length <item_name_min_length)
        return rej(`Nazwa przedmiotu powinna zawierać co najmniej ${item_name_min_length} znaki.`)
        if('item_name' in body && body.item_name.length >item_name_max_length)
        return rej(`Nazwa przedmiotu nie może zawierać wiecej niż ${item_name_max_length} znaków!`)

        //Marka
        const brand_min_length = 4,brand_max_length = 30
        if(!('brand' in body))
        return rej("Marka jest obowiązkowa")
        if('brand' in body && body.brand.length <brand_min_length)
        return rej(`Marka powinna zawierać co najmniej ${brand_min_length} znaki.`)
        if('brand' in body && body.brand.length >brand_max_length)
        return rej(`Marka nie może zawierać wiecej niż ${brand_max_length} znaków!`)

        //Model
        const model_min_length = 4,model_max_length = 30
        if(!('model' in body))
        return rej("Model jest obowiązkowy")
        if('model' in body && body.model.length <model_min_length)
        return rej(`Model powinien zawierać co najmniej ${model_max_length} znaki.`)
        if('model' in body && body.model.length >model_max_length)
        return rej(`Model nie może zawierać wiecej niż ${model_max_length} znaków!`)

        //Kwota zakupu
        const purchase_amount_min_length = 1,purchase_amount_max_length = 30
        if(!('purchase_amount' in body))
        return rej('Kwota zakupu jest obowiązkowa')
        if('purchase_amount' in body && body.purchase_amount.length <purchase_amount_min_length)
        return rej('Kwota zakupu nie może być pusta')
        if('purchase_amount' in body && body.purchase_amount.length >purchase_amount_max_length)
        return rej(`Kwota zakupu nie może przekraczać ${purchase_amount_max_length} znaków`)

        //numer seryjny
        const serial_number_min_length = 1,serial_number_max_length = 30;
        if('serial_number' in body && body.serial_number.length <serial_number_min_length)
        return rej('Numer seryjny musi coś zawierać')
        if('serial_number' in body && body.serial_number.length > serial_number_max_length)
        return rej(`Numer seryjny nie może być większy niż ${serial_number_max_length} znaków`)
        


        //data zakonczenia gwarancji


        //Nazwa sprzedawcy
        const seller_name_min_length = 1,seller_name_max_length = 30
        if('seller_name'in body && body.seller_name.length <seller_name_min_length)
        return rej('Nazwa sprzedawcy nie może być pusta !')
        if('seller_name' in body && body.seller_name.length > seller_name_max_length)
        return rej(`Nazwa sprzedawcy nie może być większa niż ${seller_name_max_length} znaków.`)

        //adres sprzedawcy
        const seller_adress_min_length = 1,seller_adress_max_length = 30
        if('seller_adress' in body && body.seller_adress.length <seller_adress_min_length)
        return  rej('Adres sprzedawcy nie może być pusty')
        if('seller_adress' in body && body.seller_adress.length > seller_adress_max_length)
        rej(`Adres sprzedawcy nie może być większy niż ${seller_adress_max_length} znaków.`)

        //email sprzedawcy
        const seller_email_min_length =1, seller_email_max_length = 30;
        if('seller_email' in body && body.seller_email.length < seller_email_min_length)
        return rej("Adres email sprzedawcy nie może być pusty")
        if('seller_email' in body && body.seller_email.length > seller_email_max_length)
        return rej(`Adres email sprzedawcy nie może być większy niż ${seller_email_max_length} znaków.`)

        //numer telefonu sprzedawcy
        const phone_number_seller_min_length =1,phone_number_seller_max_length = 30
        if('phone_number_seller' in body && body.phone_number_seller.length <phone_number_seller_min_length)
        return rej('Numer telefonu nie może być pusty')
        if('phone_number_seller' in body && body.phone_number_seller.length >phone_number_seller_max_length)
        return rej(`Number telefonu nie może być większy niz ${phone_number_seller_max_length} znaków`)

        //komentarz
        const comment_max_length = 1000
        if('comment'in body&&body.comment.length >comment_max_length)
        return rej(`Komentarz nie może być dłuższy niż ${comment_max_length}`)
        return res()
    })
}
export{add_item_validate}