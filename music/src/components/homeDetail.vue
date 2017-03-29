<template>
	<div class="homeDatail">
		<head-Top :headTitle='headTitle' goBack='goBack'></head-Top>
		<div class="header"></div>
		<div class="con">

		</div>
		<div class="playContrl">
			<div class="promini">
				<span class="currTime"></span>
				<div class="progress">
					<slide :activePro='posCurrTime' :pro='posBufferTime'></slide>
				</div>
				<span class="durationTime"></span>
			</div>
		</div>
	</div>

</template>
<script type="text/javascript">
	import slide from "./cmm/slide.vue";
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	export default {
		data: function() {
			return {
				activePro: 0,
				pro: 0,
				boVal: 0
			}
		},
		mounted: function() {
			var that = this;
			console.log(this.posCurrTime, this.posBufferTime, '.........')
		},
		methods: {
			changeTime: function(val) {
				console.log(val, '!!!');
				this.setCurrTime(val * this.durationTime);
				this.setChange(true);
				//this.posCurrTime = val;
			},
			...mapMutations([
				'setChange',
				'setCurrTime'
			])
		},
		computed: {
			...mapGetters([
				'audio',
				'isPlay',
				"change",
				'durationTime',
				'posCurrTime',
				'posBufferTime'
			]),
		},
		components: {
			slide
		},
		beforeRouteEnter: (to, from, next) => {
			next(vm => {
				
			})
		},
		// 路由离开时清除onscroll事件
		beforeRouteLeave: (to, from, next) => {			
			next()
		},
	}
</script>
<style type="text/css" scoped>
	.header {
		height: 100px;
		background: #008000;
	}
	
	.con {
		height: 200px;
		background: #42B983;
	}
</style>