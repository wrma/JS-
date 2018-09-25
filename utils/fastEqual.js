
let a = {a:1,b:{c:1,d:[1,2,3,[4,5]]}};
let b = {a:1,b:{c:1,d:[1,2,3,[4,5]]}};
function fastEqual(a,b) {
    // 判断基本类型值
    if (a === b) return true
    // 判断引用类型值
    if (typeof a === 'object' && typeof a === 'object') {
        if (a instanceof Array && b instanceof Array){
            if (a.length !== b.length) return false
            return a.every((item,index) => {
                return fastEqual(item,b[index]);
            })
        }
        if (a instanceof Object && b instanceof Object){
            // key 长度和内容不符时返回 false
            if (Object.keys(a).length !== Object.keys(b).length) return false
            for (let key in a){
                if (!Object.keys(b).includes(key))
                    return false
            }
            return Object.keys(a).every((item) => {
                return fastEqual(a[item],b[item]);
            })
        }
    }
}
console.log(fastEqual(a,b));