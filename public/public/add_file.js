export default async function add_img(allow_format,type_of_file) {
    return new Promise((res,rej) => {
        const size_of_image = 2100000;
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange =  (e) => {
            const files = e.target.files[0];
            if(files.size <size_of_image){
                const fileReader = new FileReader();
                fileReader.onloadend = async (e)=> {
                const arr = (new Uint8Array(e.target.result)).subarray(0, 4);
                let header = "";
                for(let i = 0; i < arr.length; i++) {
                    header += arr[i].toString(16);
                }
                const result = await type_of_file(header)
                if(result == undefined)
                rej('Plik ma zły format !')
                const find = allow_format.find(e=>e === result)
                if(find == undefined)
                rej('Plik ma zły format !')

                const blob = new Blob([files],{
                    type:find
                })
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onload = ()=>{
                        res(reader.result)
                }

                };
                fileReader.readAsArrayBuffer(files);
    
            }else{
                rej("Plik jest za duży")
            }
        }
        input.click();
    })
}