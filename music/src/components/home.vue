<template>
	<div class="home">
		{{msg}}
	</div>	
	
</template>
<style type="text/css" scoped>
	.home{
		padding-top: 12rem;
	}
</style>
<script>
	export default {
		name: 'home',
		data () {
			return {
				msg: '尚未开发，待续尽情期待!!!',
				flag:true,
			}
		},
		methods:{
			show:function(){
				this.flag = !this.flag;
				this.$root.$emit('change',this.flag)
			}
		},
		mounted:function(){
			console.log('组件开始构造')
		},
		created:function(){
			console.log('组件开始构造c')
		}
	}
	
</script>
