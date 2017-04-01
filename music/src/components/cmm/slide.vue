<template>
	<div class="slider">
		<div class="sliderPad">
			<div class="buffer pro" v-bind:style='bufferStyle'></div>
			<div class="progress pro" v-bind:style="proStyle"></div>
			<span class="dragBot" v-bind:style="dragStyle" v-show="botShow"></span>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {
		getStyle,
		getOffset
	} from '../../comm/commLib.js';
	export default {
		data: function() {
			return {
				proStyle: {
					width: '0px'
				},
				dragStyle: {
					left: '0px'
				},
				bufferStyle: {
					width: '0px'
				},
				max: 0
			}
		},

		props: {
			activePro: {
				type: Number,
				default: 0
			},
			pro: {
				type: Number,
				default: 0
			},
			botShow: {
				type: Boolean,
				default: true
			}
		},
		//props: ['activePro', 'pro'],
		mounted: function() {
			//	pc端
			var 
				maxWidth = 0,
				clientX = 0,
				dragBot = this.$el.getElementsByClassName('dragBot')[0],
				sliderPad = this.$el.getElementsByClassName('sliderPad')[0],
				clientX = getOffset(sliderPad,'left'),
				that = this;
			//alert(typeof clientX,'...')
			maxWidth = getStyle(sliderPad);
			this.max = parseInt(maxWidth);

			sliderPad.addEventListener('touchstart', function(e) {
				//alert('kaishi')
				document.ontouchmove = function() {
					//alert(event.targetTouches[0].pageX ,'.....')
					var pro = (event.targetTouches[0].pageX - clientX) / that.max;
					console.log('prolaile', pro);
				//	alert(pro)
					that.$emit('changes', pro)
				}
			}, false)

			document.addEventListener('touchend', function() {
				document.ontouchmove = null
			}, false)

			//alert(this.max)
			dragBot.addEventListener('mousedown', function(e) {
				document.onmousemove = function(e) {
					var pro = (e.clientX - clientX) / that.max;
					console.log('prolaile', pro);
					that.$emit('changes', pro)
				}
			});
			document.addEventListener('mouseup',
				function(e) {
					document.onmousemove = null;
				})

		},
		watch: {
			activePro: function(val) {
				console.log('......', val, this.max)
				this.proStyle.width = val * this.max + 'px';
				this.dragStyle.left = val * this.max + 'px';
			},
			pro: function(val) {
				this.bufferStyle.width = val * this.max + 'px'
			}
		},
		directives: {
			slide: {
				bind: function(el, binding) {

				}

				// 指令的定义---
			}
		}
		//		computed: {
		//			dragStyle: function() {
		//				console.log('val...')
		//					//this.proStyle.width = val * this.max + 'px';
		//				return {
		//					left: this.activePro * this.max + 'px'
		//				}
		//			}
		//		},

		//		watch: {
		//			
		//			
		//			"pro": function(val) {
		//				this.bufferStyle.width = val * this.max + 'px';
		//			}
		//		}
	}
</script>
<style type="text/css" scoped>
	.slider {
		width: 100%;
	}
	
	.pro {
		height: 0.2rem;
		position: absolute;
		top: 0;
		left: 0;
	}
	
	.sliderPad {
		position: relative;
		background: rgb(68, 70, 65);
		height: 0.2rem;
		background: #FFFFFF;
	}
	
	.buffer {
		/*background: red;*/
		/*background: rgb(67, 67, 64);		*/
		background: #CCCCCC
	}
	
	.progress {
		background: rgb(47, 54, 54)
	}
	
	.dragBot {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		background: #fff;
		position: absolute;
		top: 50%;
		z-index: 5;
		margin-top: -0.75rem;
		margin-left: -0.75rem;
		z-index: 30;
	}
</style>