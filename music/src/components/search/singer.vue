<template>
	<div class="singer">
		<ul class="search-list">
			<li class="search-item search-item-native" v-for='list in searchLists'>
				<span class="item imgHeader">			
					<img :src='list.img1v1Url'/>
				</span>
				<span class="item name">
					<p>{{list.name}}</p>
				</span>
				<p class="cutline"></p>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	import {
		search
	} from '../../api/getData.js';
	import {
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex';
	export default {
		data: function() {
			return {
				searchLists: [],
				isaddList: false,
				toast:false,
				key:''
			}
		},
		mounted: function() {

		},
		beforeRouteUpdate:function(to,from,next){
			this.key = this.$route.query.key 
			this.search()
			next()	
		},
		beforeRouteEnter: function(to, from, next) {
			next(vm => {
				vm.key = vm.$route.query.key 
				vm.search();
			})
		},
		computed: {
			...mapGetters([
				'searchKey',
				'audio',
				'playList'
			])
		},
		methods: {
			async search() {
				var res = await search(this.key, 100, 8, 0);
				this.searchLists = res.result.artists;
			},
			...mapMutations([
				'changeSong',
				'addSongList',
				'setAudio',
				'setLoading',
				'setCurrTime',
				'pause',
				'setIndex',
				'setBufferTime',
				'setPosCurrTime',
				'emptyList'
			]),
			...mapActions({
				getUrl: 'getSong'
			}),
		},
		components: {
		}
	}
</script>
<style type="text/css" scoped>
	@import url("../../style/search.css");
	.singer .imgHeader{
		width:6rem;
		height: 6rem;
	}
	.singer .name{
		padding-left: 1.3rem;
	}
</style>