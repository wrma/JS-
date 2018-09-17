

let Pub = {
    subscribers : {
        'any' : []
    }, //小本本

    subscribe(type = 'any',fn) {
        if (!this.subscribers[type]){
            this.subscribers[type] = []; //如果没有该类型则新建一个
        }
        this.subscribers[type].push(fn);
    },

    unsubscribe(type = 'any',fn){
        this.subscribers[type] = this.subscribers[type].filter(item => {
            return item !== fn;
        })
    },

    publish(type = 'any',...args){
        this.subscribers[type].forEach(item => {
            item(...args);
        })
    }
}

let Tom = {
    read(type){
        console.log(`正在阅读${type}报纸中`);
    }
}

Pub.subscribe('娱乐',Tom.read);
Pub.subscribe('文体',Tom.read);
Pub.unsubscribe('文体',Tom.read);
Pub.publish('文体','文体');
Pub.publish('娱乐','娱乐');
// 正在阅读娱乐报纸中


// 观察者模式在 vue 双向数据绑定中的应用
// 先来看看 vue 是如何实现数据劫持的

// var data = {
//     name: 'wrma',
// };
//
function observer(obj) {
    if (!obj || typeof obj !== 'object') return
    for (let key in obj) {
        defineReative(obj,key,obj[key]); // 将观测对象的属性都变成响应式的
    }
}
//
// function defineReative(obj,key,val) {
//     observer(val); // 递归将子属性也添加为响应式的
//
//     Object.defineProperty(obj,key,{ // 这里就是数据劫持的关键了
//         enumerable: true,
//         configurable: true,
//         get() {
//             console.log('get value');
//             return val
//         },
//         set(newval) {
//             console.log('set value');
//             val = newval;
//         }
//     })
// }
// observer(data);
// let name = data.name; // get value
// data.name = 'daemon'; // set value

// 上面我们监听了数据的变化，将数据变为了响应式的，但是这远远不够
// 我们知道我们想在多个使用到了该数据的地方（订阅该属性的地方），在数据改变的时候同时更新到这些地方
// 比如说 <div>{{name}}</div>
// 我们接下来再修改一下

// 通过 Dep 解耦
class Dep {
    constructor() {
        this.subs = []; // 小本本
    }
    addSub(sub) {
        this.subs.push(sub);
    }
    notify() { // 发布通知
        this.subs.forEach(item => {
            item.update()
        })
    }
}

Dep.target = null;

// 观察者
class Watcher {
    constructor(obj,key,callback) {
        Dep.target = this;
        this.obj = obj;
        this.key = key;
        this.value = obj[key]; // 这里触发属性的 getter 事件添加监听
        this.callback = callback;
        Dep.target = null;
    }
    update() {
        this.value = this.obj[this.key]
        this.callback(this.value);
    }
}

// 再对 defineReative 做一下改造，让他能进行发布订阅

function defineReative(obj,key,val) {
    observer(val); // 递归将子属性也添加为响应式的

    let dp = new Dep();
    Object.defineProperty(obj,key,{ // 这里就是数据劫持的关键了
        enumerable: true,
        configurable: true,
        get() {
            console.log('get value');
            if (Dep.target){
                dp.addSub(Dep.target);
            }
            return val
        },
        set(newval) {
            console.log('set value');
            val = newval;
            dp.notify(); // 变化的时候通知所有的观察者
        }
    })
}
var data = {
    name: 'wrma',
};
function update(value) {
    console.log('update:',value)
}

observer(data); // 对data这个对象进行监听
new Watcher(data, 'name', update); //创建观察者，并通过触发getter添加至dep列表中
data.name = 'daemon'; // set value