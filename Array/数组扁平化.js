
// 最简单也最容易想到的方法就是递归啦
let arr = [1,2,[3,[4,5,6]]];
function flatten(arr) {
    // if (arr instanceof Array) return
    let newArr = [];
    arr.forEach((item) => {
        if (item instanceof Array) {
            newArr = newArr.concat(flatten(item))
        }else {
            newArr.push(item)
        }
    });
    return newArr
}
console.log(flatten(arr));
// [ 1, 2, 3, 4, 5, 6 ]

// 然后还有一种 es6 的简易写法
let arr = [1,2,[3,[4,5,6]]];
function flatten(arr) {
    for (let i = 0 ; i<arr.length ; i++ ){
        if (arr instanceof Array) {
            arr = [].concat(...arr);
        }
    }
    return arr
}
console.log(flatten(arr));
// [ 1, 2, 3, 4, 5, 6 ]
