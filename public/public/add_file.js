export default async function add_img(allow_format) {
    return new Promise((res,rej) => {
        const size_of_image = 2100000;
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange =  e => {
            const files = e.target.files;
                const idxDot = files[0].name.split('.');
                const extFile = idxDot[idxDot.length - 1].toLowerCase();
                if (extFile == allow_format?.pdf ||extFile == allow_format?.jpg || extFile == allow_format?.jpeg || extFile == allow_format?.png ) {
                   let blob;
                    switch (extFile) {
                        case "jpg":
                            blob = new Blob([files[0]], {
                                    type: "image/jpeg"
                                });
                            break;
                        case "png":
                            blob = new Blob([files[0]], {
                                    type: "image/png"
                                });
                        break;
                        case "jpg":
                            blob = new Blob([files[0]], {
                                    type: "image/jpg"
                                });
                        break;
                    }
                    if(blob.size <size_of_image) {
                        const reader = new FileReader();
                        reader.readAsDataURL(blob);
                        reader.onload = ()=>{
                            res(reader.result)
                        }
                    }else{
                        rej("Zdjęcie jest za duże")
                    }                  
                  
                }else{
                    rej('Zdjęcie ma zły format !')
                }
            
        }
        input.click();
    })
}