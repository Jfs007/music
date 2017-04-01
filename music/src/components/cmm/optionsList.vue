<template>
	<div class="optionsList">
		<mu-bottom-sheet :open="bottomSheet" @close="close ">
			<div class="topContrl">
				<div class="cutline"></div>
				<span class="name">歌曲:{{song.name}}</span>
			</div>
			<ul class="listWrap">
				<li @click='addSong'>
					<i class="iconfont icon-bofang1"></i>
					<span class="info">			
						下一首播放</span>
					<p class="cutline"></p>
				</li>
				<li>
					<i class="iconfont icon-geshou"></i>
					<span class="info">						
						歌手:{{song.ar&&song.ar[0].name}}</span>
					<p class="cutline"></p>
				</li>
			</ul>
		</mu-bottom-sheet>
	</div>
</template>
<script type="text/javascript">
	import {
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex';
	export default {
		name: 'optionsList',
		data: function() {
			return {
				song: {},
				bottomSheet: false,
			}
		},
		methods: {
			...mapMutations([
				'setChange',
				'setCurrTime',
				'setShowDetail',
				'play',
				'pause',
				'addSongList',
			]),
			show: function(song) {
				this.song = song
				this.bottomSheet = true;
			},
			close: function() {
				this.bottomSheet = false;
			},
			addSong: function() {
				var audio = {}
				audio.id = this.song.id; // id
				audio.singer = this.song.ar[0].name || ''; // 演唱者
				audio.albumPic = this.song.al.picUrl;
				audio.name = this.song.name;
				this.addSongList({
					'audio': audio,
					type: 2
				});
				this.$emit('toast');
				this.close();
			}
		},
		watch: {
			'$route': function(to, from) {
				this.bottomSheet = false;  
			}
		}

	}
</script>
<style type="text/css" scoped>
	.cutline {
		height: 1px;
		position: absolute;
		width: 98%;
		background: radial-gradient(#d3d3d3 -90%, transparent 100%);
		bottom: 0;
	}
	
	.topContrl {
		position: relative;
		padding: 1.6rem;
		cursor: pointer;
	}
	
	.listWrap {
		max-height: 35rem;
		width: 100%;
		box-sizing: border-box;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
		padding-bottom: 1.2rem;
	}
	
	.listWrap li {
		cursor: pointer;
		position: relative;
		padding: 1.2rem;
		font-size: 1.2rem;
	}
	
	.listWrap li .info {
		padding-left: .5rem;
		color: #000;
		font-weight: 100;
	}
</style>