function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    // 一个长度为5的数组，随机的概率应为 !5 = 5*4*3*2*1
    let randomIndex = Math.floor(Math.random() * (arr.length - i)) + i;
    [arr[randomIndex], arr[i]] = [arr[i], arr[randomIndex]];
  }
  return arr;
}

let arr = [1,2,3,4,5];
console.log(shuffle(arr));

// 聊聊随机整数算法
// Math.random() 生成的是 [0, 1)
// 实现一个[min, max)
Math.floor(Math.random() * (max - min)) + min;

// 实现一个[min, max] 
Math.floor(Math.random() * (max - min + 1)) + min;

// 参考资料：https://www.hangge.com/blog/cache/detail_1872.html
