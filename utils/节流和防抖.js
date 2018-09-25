
// 关于节流和防抖的文章，网络上讲的也有很多

// 简单来说就是节流相当于固定多少时间间隔执行一次
// 防抖就是在一定时间间隔内如果不再触发，则继续执行（相当于进电梯，只要一直有人进电梯，电梯是不会关的）

// 节流
function throttle(fn,delay) {
    let timer = null;
    return function(...args) {
        if (timer) return
        timer = setTimeout(() => {
            fn.apply(this,args);
            timer = null
        },delay)
    }
}

// 防抖
function debounce(fn,delay) {
    let timer = null;
    return function (...args) {
        if (timer) {
            clearTimeout(timer); // 如果有定时器的话就重新再生成一个（不停更新定时器）
        }
        timer = setTimeout(() => {
            fn.apply(this,args);
        },delay)
    }
}

// once 让函数只执行一次
function once(fn){
    let once = false;
    return function(...args){
        if (once) return;
        once = true;
        return fn.apply(this,args);
    }
}

// 改良版 once
function once(fn){
    return function(...args){
        if (fn) {
            let ret = fn.apply(this,args);
            fn = null; // fn 使用过一次之后就可以释放了，不然按上面的方法是会一直存着一个引用的
            return ret
        }
    }
}

