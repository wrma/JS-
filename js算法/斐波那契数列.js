/**
 * @param {number} N
 * @return {number}
 */
// 最普通的递归解法
var fib = function(N) {
  if (N === 0 || N === 1) return N;

  return fib(N-1) + fib(N-2);
};


// 带备忘录的解法
var fib = function(n) {

  const memo = [];

  function memoize(n, memo) {
    if (n === 0 || n === 1) return n;

    if(memo[n]) {
      return memo[n]
    }

    memo[n] = memoize(n - 1, memo) + memoize(n - 2, memo);

    return memo[n];
  }

  return memoize(n, memo);
};

// 迭代的解法
var fib = function(n) {

  const memo = [];
  
  memo[0] = 0;
  memo[1] = 1;

  for(let i = 2; i <= n; i++) {
    memo[i] = memo[i-1] + memo[i-2];
  }

  return memo[n]
};

fib(3);

