// import pdfkit from 'pdfkit'
// import pkg from 'firebase-admin'
// import {makeId} from '../global/makeId.js'
// const {storage} = pkg
// const PDFDocument = pdfkit
// const create_pdf_file = (data)=>{
//     return new Promise(async (res,rej)=>{
//         const {img,file_id} = data
//         const file_name = await makeId(10)
//         const myPdfFile = firebase.storage().bucket().file('test.pdf');
//         const doc = new PDFDocument({pdfVersion:"1.7"});
//         doc.image(img, {
//             fit: [250, 300],
//             align: 'center',
//             valign: 'center'
//           });
//         doc.end()
        
//     })
// }
// export{create_pdf_file}