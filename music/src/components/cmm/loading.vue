<template>
	<div class="load pos">
		<i></i>
		<i></i>
		<i></i>
		<i></i>
		<span>{{loadText}}</span>
	</div>
</template>
<script type="text/javascript">
	export default {
		data:function(){
			return {
				
			}
		},
		props:{
			loadText:{
				type:String,
				default:'努力加载中..'
			},
		}
	}
</script>
<style type="text/css" scoped>
	@import url("../../style/set.css");
	.pos{
		position: absolute;
		top:3rem;
		left: 50%;
		transform: translateX(-50%);
		color: #808080;
	}
	.load span{
		padding-left: 1.2rem;
		margin-bottom: -0.2rem;
	}
</style>