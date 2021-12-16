
const types_of_files = (code)=>{
    switch (code) {
        case "89504e47":
            return "image/png"
            break;
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
            return"image/jpeg"
            break;
        case "25504446":
           return 'application/pdf'
        break;
        default:
           return undefined
            break;
    }
}
export{types_of_files}