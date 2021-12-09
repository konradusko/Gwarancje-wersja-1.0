const isHtml = (input)=>{
    if(input.includes('&lt;') || input.includes('&gt;'))
    return false;
    return /<[a-z]+\d?(\s+[\w-]+=("[^"]*"|'[^']*'))*\s*\/?>|&#?\w+;/i.test(input);
}
export{isHtml}