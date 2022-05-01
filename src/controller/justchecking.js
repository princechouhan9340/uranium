const filterArray=a=>a.filter(x=>typeof x!=='string'||!!x.trim())

console.log(filterArray([1, 2, 4, '    jlasdfla    ', '']))