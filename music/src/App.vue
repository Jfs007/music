<template>
<div class="app">	
	<transition name="router-fade" mode="out-in">
		<keep-alive>
			<router-view ></router-view>
		</keep-alive>		
	</transition>
	<song-bar v-show='showDetail'></song-bar>
</div>
	
	
</template>
<script type="text/javascript">
	//import headTop from './components/commHeader/header.vue';
	import {
		mapGetters
	} from 'vuex';
	import songBar from './components/playBar/playBar.vue';
	//window.document.fontSize =;
//	window.onresize = function(){
//		console.log('kongzhi')
//	//	document.gete
//		window.document.fontSize =  window.innerWidth / 360 * 10 + 'px';
//		
//	}
	console.log(window.document.fontSize)
	export default {
		data: function() {
			return {
				
			}
		},
		components:{
			songBar
		},
		computed:{
			...mapGetters([
				'showDetail'
			])
		}
//		watch: {
//			'$route' (to, from) {
//				const toDepth = to.path.split('/').length
//				const fromDepth = from.path.split('/').length;
//				console.log(toDepth, fromDepth)
//				this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
//			}
//		}
	}
</script>
<style type="text/css">
/*测试阶段，以360px为准， 1rem = 10px*/
	@import url("//at.alicdn.com/t/font_w2sygrotfh5gsyvi.css");
	html{
		padding: 0;
		margin: 0;
		
	}
	body,
	div,
	h1,
	h2,
	h3,
	h4,
	h5,
	ul,
	ol,
	li,
	dl,
	dt,
	dd,
	textarea,
	form,
	p,
	figure {
		margin: 0;
		padding: 0;
		font-weight: normal;
		line-height: 100%;
		font-weight: 100;
	}
	body{
		background-color:rgb(236,242,240);
	}
	i,span,b{
		font-weight: normal;
		font-style: normal;
		line-height: 100%;
	}
	ul,
	li {
		list-style: none;
	}
	
	a {
		text-decoration: none;
		color: #fff;
	}
	.fl{
		float: left!important;
	}
	.fr{
		float: right!important;
	}
	.clearfix{
		clear: both;
	}
	#app {
		/*position: relative;*/
	}
	.app{
		/*position: relative;*/
		z-index: 0;
	}
	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .2s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}
</style>