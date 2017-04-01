import {
	getStyle,
	getOffset
} from './commLib.js';

const loadMore = {
	directives: {
		'load-more': {
			bind: function(el, binding) {
				var windowHeight = document.documentElement.clientHeight;
				var elHeight = 0;
				var marginBottom = 0;
				var paddingBottom = 0;
				var offsetTop = 0;
				var gap = 3;
				var endScrollTop = 0;
				var requestFram;
				var loadMore = function() {
					//var all =document.documentElement.scrollTop ||document.body.scrollTop+windowHeight;
					//console.log(offsetTop,el.clientHeight,marginBottom,paddingBottom,all)
					if((document.documentElement.scrollTop ||document.body.scrollTop) + windowHeight>=elHeight+offsetTop-gap){
						//console.log('...ddddddddiiiii')
						//alert('go')
						binding.value();					
					}
				};
				var moveEnd = function(){
					requestFram = requestAnimationFrame(function() {
						if (document.documentElement.scrollTop ||document.body.scrollTop != endScrollTop) {
							endScrollTop = document.documentElement.scrollTop ||document.body.scrollTop;
							moveEnd()
						} else {
							cancelAnimationFrame(requestFram);
							elHeight = parseInt(getStyle(el, 'height'));;
							loadMore();
						}
					})
				}
				el.addEventListener('touchstart', function() {
					offsetTop = getOffset(el,'top')
					elHeight = parseInt(getStyle(el,'height'));		
					//alert(elHeight)
					marginBottom = parseInt(getStyle(el, 'marginBottom'));
					paddingBottom = parseInt(getStyle(el, 'paddingBottom'));
					//console.log(elHeight,'.........qe',paddingBottom,marginBottom)
					
				}, false)
				el.addEventListener('touchmove', function() {
					loadMore();
				},false)
				el.addEventListener('touchend',function() {
					endScrollTop = document.documentElement.scrollTop ||document.body.scrollTop;
					moveEnd()
				},false)
			}
		}
	}
}
export {
	loadMore
}
