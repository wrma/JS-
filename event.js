// 一个通用的事件监听函数（用于兼容 DOM0 和 IE8 以下的情况）

const EventUtil = {
    // 添加事件
    addEvent: function(element, type, handler) {
        if (element.addEventListener) {
          // DOM2 ele.addEventListener('click', handleClick, false)
          element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
          // IE8以下 ele.addEvent('onclick', handleClick) IE8以下事件流只有冒泡，所以没有最后一个参数
          element.attachEvent("on" + type, handler);
        } else {
          // DOM0 ele.onclick = handleClick
          element["on" + type] = handler;
        }
      },
    
      // 移除事件
      removeEvent: function(element, type, handler) {
        if (element.removeEventListener) {
          element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
          element.detachEvent("on" + type, handler);
        } else {
          element["on" + type] = null;
        }
      },
    
      // 获取事件目标
      getTarget: function(event) {
        return event.target || event.srcElement;  // (兼容IE)
      },
    
      // 获取 event 对象的引用，取到事件的所有信息，确保随时能使用 event
      getEvent: function(event) {
        return event || window.event;
      },
    
      // 阻止事件（主要是事件冒泡，因为 IE 不支持事件捕获）
      stopPropagation: function(event) {
        if (event.stopPropagation) {
          event.stopPropagation();
        } else {
          event.cancelBubble = true;
        }
      },
    
      // 取消事件的默认行为
      preventDefault: function(event) {
        if (event.preventDefault) {
          event.preventDefault();
        } else {
          event.returnValue = false;
        }
      }
}