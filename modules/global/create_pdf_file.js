import pdfkit from 'pdfkit'
const create_pdf_file = (data)=>{
    return new Promise((res,rej)=>{
        const {password,img} = data
        const doc = new PDFDocument({userPassword:password,pdfVersion:"1.7"});
        doc.image(img, {
            fit: [250, 300],
            align: 'center',
            valign: 'center'
          });
        doc.end()
        res(doc)
    })
}
export{create_pdf_file}