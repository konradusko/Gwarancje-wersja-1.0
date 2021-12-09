import {isValidDate} from '../global/validate_date.js'
import {isHtml} from '../global/is_html_in_text.js'
const validate_update_event = (data) =>{
    return new Promise((res,rej)=>{
        const {body,validate_info} = data;

        //'date_of_event','name','description'
        if('date_of_event' in body && !(typeof body.date_of_event === 'string'))
        return rej('Data musi być typem string.')
        if('date_of_event' in body && body.date_of_event.length != 10)
            return rej('Data musi miec format yyyy-mm-dd')
        if('date_of_event' in body && !(isValidDate(body.date_of_event)))
            return rej(`Podana data jest błędna. Data musi miec format yyyy-mm-dd.`)
        if('date_of_event' in body && isHtml(body.date_of_event))
            return rej('Data zawiera niedozwolone znaki.')

        //nazwa
        if('name' in body && !(typeof body.name === 'string'))
        return rej('Nazwa musi być typem string.')
        if('name' in body && body.name.length > validate_info.name_max_length)
            return rej(`Nazwa nie może być dłuższa niż ${validate_info.name_max_length} znaków.`)
        if('name' in body && body.name.length < validate_info.name_min_length)
            return rej(`Nazwa nie może być krótsza niż ${validate_info.name_min_length} znaków.`)
        if('name' in body && isHtml(body.name))
            return rej('Nazwa zawiera niedozwolone znaki.')

        if('description' in body && !(typeof body.description === 'string'))
            return rej('Opis musi byc typem string.')
        if('description' in body &&  body.description.length > validate_info.description_max_length)
            return rej(`Opis nie może być dłuższy niż ${validate_info.description_max_length} znaków.`)
        if('description' in body && isHtml(body.description))
            return rej('Opis zawiera niedozwolone znaki.')

        res()
        })
}
export{validate_update_event}