<template>
	<div class="like">
		{{msg}}
	</div>
</template>
<script>
	import { mapGetters }  from 'vuex';
	console.log()
	export default {
		name: 'like',
		watch:{
			'$route':function(){
				console.log('...',this,'like页面')
			}
			},
		computed: {
			...mapGetters([
			]),
		},
		mounted:function(){
			var that = this;
			this.$root.$on('change',function(flag){
				that.flag = flag;
			})
		},
		methods:{
		},
		data() {
			return {
				msg: '尚未开发，待续尽情期待!!!',
				flag:true
			}
		}
	}
</script>
<style type="text/css">
	.like{
		padding-top: 12rem;
	}
</style>