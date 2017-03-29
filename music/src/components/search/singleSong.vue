<template>
	<div class="singleSong">
		<ul class="search-list">
			<li class="search-item" v-for="list in searchLists" @click='bossPlay(list)'>
				<span class="item left">
					<p class="name noWrap searchRow"><span>{{list.name}}</span></p>
				<p class="singer">{{list.ar[0].name}}</p>
				</span>
				<span class="item" @click.stop='options(list)'><i class="iconfont icon-diandian"></i></span>
				<p class="cutline"></p>
			</li>
		</ul>
		<mu-toast v-if="toast" message="已添加到下一首播放" />
		<options-list ref='optionslist' @toast='showToast'></options-list>
	</div>
</template>
<script type="text/javascript">
	import optionsList from '../cmm/optionsList.vue';
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
				'audio',
				'playList'
			])
		},
		methods: {
			addlist: function() {
				this.emptyList();
				var that = this;
				this.list.forEach(function(song, index) {
					that.addSongList({
						'audio': {
							id: song.id,
							singer: song.ar[0].name,
							albumPic: song.al.picUrl,
							name: song.name
						}
					});
				})
			},
			openLoad: function() {
				var myaudio = document.getElementById('myaudio');
				this.pause();
				this.setLoading(true);
				myaudio.pause();
			},
			bossPlay: function(song) {
				if(song.id !== this.audio.id) {
					this.openLoad();
					var length = this.playList.length;
					var isExit = false;
					for(var i = 0; i < length; i++) {
						if(song.id === this.playList[i].id) {

							isExit = true;
							this.setIndex(i + 1);
							this.getUrl(song.id)
							break;
						}
					}
					if(!isExit) {
						var audio = {}
						audio.id = song.id; // id
						audio.singer = song.ar[0].name; // 演唱者
						audio.albumPic = song.al.picUrl;
						audio.name = song.name;
						//this.setLoading(false)
						this.addSongList({
							'audio': audio
						});
						this.getUrl(song.id);
					}
				}
			},
			showToast: function() {
				this.toast = true;
				var that = this;
				setTimeout(function() {
					that.toast = false;
				}, 700)
			},
			options: function(song) {
				this.$refs.optionslist.show(song);
			},
			async search() {
				var res = await search(this.key, 1, 8, 0);
				this.searchLists = res.result.songs;
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
			optionsList
		}
	}
</script>
<style type="text/css" scoped>
	@import url("../../style/search.css");
	.left {
		width: 30.8rem;
	}
	
	.name span {
		color: rgb(107, 138, 180);
		font-size: 1.6rem;
	}
</style>