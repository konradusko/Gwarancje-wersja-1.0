import {isValidDate} from './validate_date.js'
const add_item_event_validate = (data)=>{
    return new Promise((res,rej)=>{
        const {body,validate_info} = data;

             // date_of_event
            if(!('date_of_event' in body))
                return rej('Data zdarzenia jest wymagana.')
            if('date_of_event' in body && !(typeof body.date_of_event === 'string'))
                return rej('Data musi być typem string.')
            if('date_of_event' in body && body.date_of_event.length != 10)
                return rej('Data musi miec format yyyy-mm-dd')
            if('date_of_event' in body && !(isValidDate(body.date_of_event)))
                return rej(`Podana data jest błędna. Data musi miec format yyyy-mm-dd.`)
                //nazwa
            if(!('name' in body))
                return rej('Nazwa jest wymagana')
            if('name' in body && !(typeof body.name === 'string'))
                return rej('Nazwa musi być typem string.')
            if('name' in body && body.name.length > validate_info.name_max_length)
                return rej(`Nazwa nie może być dłuższa niż ${validate_info.name_max_length} znaków.`)
            if('name' in body && body.name.length < validate_info.name_min_length)
                return rej(`Nazwa nie może być krótsza niż ${validate_info.name_min_length} znaków.`)
            //opis

            if('description' in body && !(typeof body.description === 'string'))
                return rej('Opis musi byc typem string.')
            if('description' in body &&  body.description.length > validate_info.description_max_length)
                return rej(`Opis nie może być dłuższy niż ${validate_info.description_max_length} znaków.`)

            res()
    })
}
export{add_item_event_validate}