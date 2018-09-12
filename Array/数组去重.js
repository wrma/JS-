
//总结一下数组去重的几种方法，其实去重方法很多，这是一个可以不断被扩充的东西

let arr = [1,1,2,3,1,1,4,3];

// es6
let res = [...new Set(arr)];
console.log(res);

// indexOf 法
let res = [];
for (let i = 0;i<arr.length;i++) {
    if (res.indexOf(arr[i]) === -1){    // 如果在res中没有该元素的话则添加
        res.push(arr[i]);
    }
}
console.log(res);
// 这个方法同理可把循环变成 forEach , indexOf() 变成 includes() ,都是可以的


// filter 法
let res = arr.filter((item,index,array) => {
    return array.indexOf(item) === index;   // 把第一个符合索引的元素添加进 res 中
});
console.log(res);

// reduce 法（其实和 filter 有些类似）
