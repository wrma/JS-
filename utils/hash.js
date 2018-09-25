
// 封装一些跟hash有关的相关操作

// 获取url参数

class Search {
    constructor(){
        this.hash = []
        // let search = window.location.search.split('?');
        let search = '?a=666&b=2'.split('?');
        let searchValue = search[1].split('&');
        for (let i = 0;i<searchValue.length;i++) {
            let item = searchValue[i].split('=');
            this.hash.push({
                name: item[0],
                value: item[1]
            })
        }
    }

    getValue(name) {
        let res = this.hash.filter((item) => {
            return item.name === name
        })
        return res[0].value
    }

    setValue(name,value) {

    }
}
let search = new Search();
let res = search.getValue('a');
console.log(res);

let Hash = {
    getValue(key) {
        let reg = new RegExp("[\?|&]" + key + "=([^&]*)");
        let regValue = window.location.search.match(reg);
        if (regValue !== null && regValue.length > 0){
            return regValue[1]
        }
    },
    addValue(key,value) {
        let hashValue = window.location.search;
        let reg = new RegExp("[\?|&]" + key + "=([^&]*)");
        if(reg.test(hashValue)) {
            hashValue = hashValue.replace(reg, function (match,p1) {
                let regArr = match.split('=');
                regArr[1] = value;
                return regArr.join('=')
            })
        }else {
            let prefix = hashValue.length > 1 ? '&' : '?';
            hashValue = `${hashValue.slice(1)}${prefix}${key}=${value}`;
        }
        window.location.search = hashValue
    }
}