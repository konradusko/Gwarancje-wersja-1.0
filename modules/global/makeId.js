const makeId = (length)=>{
    return new Promise((res,rej)=>{
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *characters.length));
        }
        res(result)
    })
}

export {makeId}