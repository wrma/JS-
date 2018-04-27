
//Array.from
//类数组
function f() {
    //将参数转化为数组
    return Array.from(arguments); 
}
console.log(f(1,2,3)); //[1,2,3]
//数组去重合并
function combine() {
    let arr = Array.prototype.concat.apply([],arguments); //[1,2,3,2,3,3]
    let set = new Set(arr); //Set { 1, 2, 3 }
    return Array.from(set); //将set结构转化为数组
}
combine([1,2,3],[2,3,3]);
//使用箭头函数
Array.from([1,2,3],x=>x*2); //2,4,6
Array.from({length:5},(item,key)=>key); //[ 0, 1, 2, 3, 4 ]


//Array.isArray

//Array.prototype.concat()
var arr1 = [1,2,3];
var arr2 = [4,[5,6]];
console.log(arr1.concat(arr2)); //[ 1, 2, 3, 4, [ 5, 6 ] ]
arr2[1].push(7);  //原数组被改变
console.log(arr1.concat(arr2)); //[ 1, 2, 3, 4, [ 5, 6, 7 ] ],新数组中的值也随之改变


//Array.prototype.filter()
var filterValue = function(value,index,array){
    return value>10
}
var filterIndex = function(value,index,array){
    return index>0
}
var arr = [1,12, ,2,17,4];
arr.filter(filterValue); //[12,17]
arr.filter(filterIndex); //[12,2,17,4] ,注意数组中未被赋值或已删除的元素


//Array.prototype.forEach()
function logArrayElements(element, index, array) {
    console.log("a[" + index + "] = " + element);
}
// 注意索引2被跳过了，因为在数组的这个位置没有项
[2, 5, ,9].forEach(logArrayElements);
// a[0] = 2
// a[1] = 5
// a[3] = 9

//Array.prototype.indexOf()
var arr = [2,3,1,5,4,3,7];
arr.indexOf(3); //1 注意，只找第一个位置元素所对应的索引
arr.indexOf(6); //-1 该值不存在，返回-1
arr.indexOf(3,4); //5
arr.indexOf(3,8); //-1 后一个参数大于数组长度，不查找，直接返回-1
arr.indexOf(3,-2); //5 后一个参数为负数是表示从倒数第几个元素开始查找，这里找到的是索引值为5的3
arr.indexOf(3,-1); //-1 倒数第一个位置上只有7，找不到3，返回-1（不会再往前查找）

//找出指定元素出现的所有位置
var arr = [1,2,1,3,4,1,5];
function findEle(arr,ele) {
    var index = arr.indexOf(ele);
    var result = [];
    while(index != -1){
        result.push(index);
        index = arr.indexOf(ele,index+1);
    }
    return result
}
console.log(findEle(arr,1));


//Array.prototype.reduce()
[0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array){
    console.log('ac:'+accumulator,'cv:'+currentValue);
    return accumulator + currentValue;
});
var sum = [0, 1, 2, 3].reduce(function (a, b) {
    console.log('ac:'+a,'cv:'+b);
    return a + b;
}, 0);







