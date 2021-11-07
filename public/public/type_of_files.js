export default function type_file(code) {
    return new Promise((res,rej)=>{
        switch (code) {
            case "89504e47":
                res("image/png")
                break;
            case "ffd8ffe0":
            case "ffd8ffe1":
            case "ffd8ffe2":
            case "ffd8ffe3":
            case "ffd8ffe8":
                res("image/jpeg")
                break;
            default:
                res(undefined)
                break;
        }
    })
}