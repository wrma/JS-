
function add(num1, num2) {
  let arr1 = num1.split('');
  let arr2 = num2.split('');

  // 判断是否需要进位
  let c = false;

  let result = '';

  while (arr1.length || arr2.length || c) {
    // 计算末尾两值的相加结果
    c += ~~arr1.pop() + ~~arr2.pop();

    result = c % 10 + result;

    // 大于9的话，c为true，在数值计算时会被转化为 1
    c = c > 9
  }

  return result;

}

console.log(add('11111111111111111','22222222222222'))