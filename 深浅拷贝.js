/*
什么是深拷贝？什么是浅拷贝
浅拷贝就是，对于那些引用类型只能拷贝到他的引用地址
* */

// 对于数组
let arr = [1,12,3,4];
let newArr = arr.concat();
newArr.push(100);
console.log('arr',arr,'newArr',newArr);
// arr [ 1, 12, 3, 4 ] newArr [ 1, 12, 3, 4, 100 ]
// 只有newArr 改变了，arr并没有改变

let arr = [1,[1,2,3],{a:1}];
let newArr = arr.concat();
newArr[1].push(4);
console.log('arr',arr,'newArr',newArr);
// arr [ 1, [ 1, 2, 3, 4 ], { a: 1 } ] newArr [ 1, [ 1, 2, 3, 4 ], { a: 1 } ]
// 我们希望的是 newArr 的改变并不会影响到 arr，然而由于concat是浅拷贝，只能拷贝出里面数组的引用


// 这个时候我们就需要深拷贝了
// 对于数组，有一个简单粗暴的方法进行深拷贝 JSON.stringify
let arr = [1,[1,2,3],{a:1}];
let newArr = JSON.parse(JSON.stringify(arr));
newArr[1].push(4);
console.log('arr',arr,'newArr',newArr);
// arr [ 1, [ 1, 2, 3 ], { a: 1 } ] newArr [ 1, [ 1, 2, 3, 4 ], { a: 1 } ]
// 可以看到只有 newArr 有发生改变，这正是我们所需要的结果

// 这个方法对对象来说也是适用的
let obj = {a:1,b:2};
let newObj = JSON.parse(JSON.stringify(obj));
newObj.b = 3;
console.log('obj',obj,'newObj',newObj);
// obj { a: 1, b: 2 } newObj { a: 1, b: 3 }

// 但是这个方法也有一个弊端，他没有办法拷贝函数（至于原因，就是JSON的一些原因了）
var arr = [function(){
    console.log(a)
}, {
    b: function(){
        console.log(b)
    }
}]
let newArr = JSON.parse(JSON.stringify(arr));
console.log('arr',arr,'newArr',newArr);
// obj [ [Function], { b: [Function: b] } ] newObj [ null, {} ]

// 数组有concat(),slice()等方法来实现浅拷贝，那浅拷贝一个对象又该如何做呢
// 这里很容易想到让他们的键和键值一一对应就好了
let obj = {a:1,b:2,c:{d:4}};
function shallowCopy(obj) {
    let newObj = {};
    for (let key in obj) {
        newObj[key] = obj[key]
    }
    return newObj;
}
let newObj = shallowCopy(obj);
newObj.b = 3;
newObj.c.d = 5;
console.log('obj',obj,'newObj',newObj);
// obj { a: 1, b: 2, c: { d: 5 } } newObj { a: 1, b: 3, c: { d: 5 } }
// 注意观察 b 和 c 这两个属性, 这就是浅拷贝啦


// 那深拷贝怎么做呢？递归调用我们的方法不就好了嘛
let obj = {a:1,b:2,c:{d:4}};
function deepCopy(obj) {
    if (typeof obj !== 'object') return
    let newObj = {};
    for (let key in obj) {
        newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    }
    return newObj;
}
let newObj = deepCopy(obj);
newObj.b = 3;
newObj.c.d = 5;
console.log('obj',obj,'newObj',newObj);
// obj { a: 1, b: 2, c: { d: 4 } } newObj { a: 1, b: 3, c: { d: 5 } }
// 看看结果，现在就都没有影响到了





