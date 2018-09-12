
// 封装一些跟hash有关的相关操作

// 获取url参数

class Hash {
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
let hash = new Hash();
let res = hash.getValue('a');
console.log(res);