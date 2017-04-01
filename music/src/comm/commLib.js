var getOffset = function(obj,type) {
				type = (type==='left')?'offsetLeft':'offsetTop';
					var l = obj[type]; //对应父容器的上边距
					//alert(obj+l)
					while(obj = obj.offsetParent) {
						l += obj[type];
					}
					//alert(l+'ak2dd32')
					//	console.log(l,'..lgetPoint')
					return parseInt(l)
}
var getStyle = function(ele,style){
	return ele.currentStyle ?
	ele.currentStyle[style] : getComputedStyle(ele, false)[style];
}

export {
	getOffset,
	getStyle
}
