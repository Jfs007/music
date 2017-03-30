<template>
	<div class="album">
		<ul class="search-list">
			<loading v-if='loading'></loading>
			<li class="search-item search-item-native" v-for='list in searchLists' @click='play(list)'>
				<span class="item imgAlbum">			
					<img src="../../assets/player-bar.png" :src='list.picUrl' lazy='loading'/>
				</span>
				<span class="item name">
					<p class="name noWrap searchRow">{{list.name}}</p>
					<p>{{list.artist.name}}</p>
				</span>
				<p class="cutline"></p>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	import loading from '../cmm/loading.vue';
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
				toast: false,
				key:'',
				loading:true
			}
		},
		beforeRouteUpdate:function(to, from, next) {
			this.key = this.$route.query.key ;
			this.loading = true;
			this.search();
			next();
		},
		beforeRouteEnter:function(to, from, next) {
			next( vm => {
				vm.loading = true;
				vm.key = vm.$route.query.key 
				vm.search();
			})
		},
		computed: {
			...mapGetters([
				'audio',
				'playList'
			])
		},
		methods: {
			async search() {
				var res = await search(this.key, 10, 8, 0);
				this.searchLists = res.result.albums;
				this.loading = false;
			},
			play: function(item) {
				this.$router.push({
					name: 'listDetail',
					params: {
						id: item.id,
						name: item.name,
						coverImg: item.picUrl,
						creator: item.artist,
						count: item.size,
						desc: item.description,
						type:'album'
					}
				})
			},
			...mapMutations([
				'changeSong',
				'addSongList',
				'setAudio',
				'setLoading',
				'emptyList'
			]),
			...mapActions({
				getUrl: 'getSong'
			}),
		},
		components:{
			loading
		}
	}
</script>
<style type="text/css" scoped>
	@import url("../../style/search.css");
	img[lazy=loading]{
		background: url(../../../static/default_cover.png) repeat;
		background-size: contain;
	}
	.album .imgAlbum {
		width: 8rem;
		height: 6rem;
		background: url(../../assets/placeholder_disk_play_program.png) 1.2rem 0rem no-repeat;
		background-size: contain;
	}
	
	.album .imgAlbum img {
		width: 6rem;
		height: 6rem;
	}
	
	.album .name {}
</style>