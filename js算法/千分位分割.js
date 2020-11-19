
let str = '123456789';

function formatCash(str) {
  const arr = str.split('').reverse();
  const res = arr.reduce((acc, cur, index) => {
    return index % 3 ? `${cur}${acc}` : `${cur},${acc}`
  })
  return res;
}

// function formatCash(str) {
//   const reg = /(?!^)(?=(\d{3})+$)/g;
//   return str.replace(reg, ',')
// }

console.log(formatCash(str));