//支持amd cmd common 规范
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === "function" && define.cmd) {
        define(function (require, exports, module) {
            module.exports = factory();
        });
    } else {
        root.pushPanel = factory;
    }
})(this,function(){
    var wrap = document.querySelector('.wrapper');
    var panels = wrap.querySelectorAll('.panel');
    function getStyle(ele,prop){
        if(getComputedStyle){
            return getComputedStyle(ele)[prop];
        }else{
            return ele.currentStyle[prop];
        }
    }

    var flag = 'num',arr=[];
    var w = parseInt(getStyle(panels[0],'width'));
    for(var i=0; i<panels.length; i++){
        panels[i].style.transform='translate3d('+w*i+'px,0,0)';
        panels[i].setAttribute('data',flag+i);
        arr.push(flag+i);
    }

    //1,2,3,4
    //4,1,2,3

    function movePanel(arr){
        arr.forEach(function(v,i){
            Array.apply(null,panels).forEach(function(panel,idx){
                if(panel.getAttribute('data') == v){
                    panel.style.transform = 'translate3d('+w*i+'px,0,0)'
                }
            })
        })
    }

    function inArray(target, arr){
        if(typeof target=='object' || typeof target=='function' || typeof target== 'NaN' || typeof target== 'null' || typeof target == 'undefined'){
            return false
        }else{
            for(var i=0; i<arr.length; i++){
                if(target == arr[i]){
                    return i
                }
            }
        }
    }

    wrap.addEventListener('click',function(e){
        e = e || event;
        var ele = e.target || e.srcElement;
        if(ele.tagName.toLowerCase() !== 'span') return;
        var dir = ele.getAttribute('direct') || ele.getAttribute('close');
        var curData = ele.parentNode.parentNode.getAttribute('data');
        var index = inArray(curData,arr);
        var siblingsIndex,tmp;
        if(dir == 'right'){//[num0,num1,num2,num3]
            //splice  3个参数：起始索引 长度 替换字符
            tmp = arr[index];
            siblingsIndex = (index+1)>arr.length-1?0:(index+1);
            arr.splice(index,1,arr[siblingsIndex]);
            arr.splice(siblingsIndex,1,tmp);

        }else if(dir == 'left'){
            tmp = arr[index];
            siblingsIndex = (index-1)<0?arr.length-1:index-1;
            arr.splice(index,1,arr[siblingsIndex]);
            arr.splice(siblingsIndex,1,tmp);
        }else{
            wrap.removeChild( ele.parentNode.parentNode);
            arr.splice(index,1)
        }
        movePanel(arr);
    },true);
});

