<template>
	<div class="listDatil">
		<div class="header">
			<div class="showBg bgPostion" :style="{'background-image':'url(' + coverImgUrl + ')' ,'opacity': opacity}"></div>
			<span class="goBack" @click='$router.go(-1)'><i class='iconfont icon-fanhui'></i></span>
			<div class="playtitle">
				<p class="scrollBar">{{name}}</p>
			</div>
		</div>
		<div class="songIntro">
			<div class="showBg" :style="{'background-image':'url(' + coverImgUrl + ')'}"></div>
			<div class="songImg fl" @click='show'><img :src="coverImgUrl" alt="" /></div>
			<ul class="aboutSong ">
				<li class="name">{{tname}}</li>
				<li class="singer">
					<span class="headerImg"><img :src="creator.avatarUrl" alt="" /></span>
					<i>{{creator.nickname||creator.name | slice}} <i class="icon">></i></i>
				</li>
			</ul>
		</div>
		<div class="playContrl">
			<p class="playAll">
				<i class="icon"></i>
				<span @click='playAll()'>播放全部</span>
				<i class="allnum">(共{{list.length}}首)</i>
			</p>
		</div>
		<ul class="playList">
			<loading v-if='loading'></loading>
			<li v-for='(song,index) in list' @click='bossPlay(song)'>
				<p class='cutline'></p>
				<i class="index" v-if='audio.id!==song.id'>{{index+1}}</i>
				<i v-else class="index bold iconfont icon-laba"></i>
				<span class="songTitle">
					<p class="nameRow">
					<i class="name">{{song.name}}</i>				
					<i class="iconfont icon-MV" v-if='song.mv' @click.stop='toMv(song)'></i>
					</p>
					<p class="singer">{{song.ar[0].name}}</p>
				</span>
				<span class="option" @click.stop='options(song)'><i class="iconfont icon-diandian"></i></span>
			</li>
		</ul>
		<mu-toast v-if="toast" message="已添加到下一首播放" />
		<options-list ref='optionslist' @toast='showToast'></options-list>
		<div class="detailWrap"  v-show='detailWrap'>
			<div class="detailMain">
				<span class="close" @click ='close'> 
					<i class="iconfont icon-x"></i>
				</span>
				<div class="img">
					<img :src="coverImgUrl" alt="" />
				</div>
				<div class="title">{{tname}}</div>
				<div class="content">
					{{description}}
				</div>			
			</div>
			<span class="bottom">评论</span>
		</div>
	</div>
</template>
<script type="text/javascript">
	import optionsList from './cmm/optionsList.vue';
	import loading from './cmm/loading.vue';
	import {
		getDataList,
		getSong
	} from '../api/getData.js';
	import {
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex';
	export default {
		data: function() {
			return {
				toast: false,
				coverImgUrl: '',
				name: '歌单',
				tname: '',
				description: '歌单描述',
				playCount: 0,
				creator: '歌单作者',
				id: 0,
				list: [],
				opacity: 0,
				isaddList: false,
				detailWrap: false,
				type:'',
				album:{},
				loading:true
			}
		},

		computed: {
			...mapGetters([
				'audio',
				'playList'
			])
		},
		beforeRouteEnter: function(to, from, next) {
			next(vm => {		
				if(to.params.coverImg&&vm.id!==vm.$route.params.id) {
					// 获取songList传入的数据
					vm.coverImgUrl = vm.$route.params.coverImg
					vm.description = vm.$route.params.desc
					vm.playCount = vm.$route.params.count
					vm.creator = vm.$route.params.creator
					vm.id = vm.$route.params.id
					vm.tname = vm.$route.params.name
					vm.type = vm.$route.params.type
					vm.list = [];
					vm.loading = true;
					vm.getlist();
				}
				//console.log(vm.coverImgUrl)				
				window.onscroll = () => {
					var opa = window.pageYOffset
					if(opa > 15) {
						vm.name = vm.tname
					} else {
						vm.name = '歌单'
					}
					vm.opacity = window.pageYOffset / 10
				}
			})
		},
		beforeRouteLeave: function(to, from, next) {
			window.onscroll = null;
			this.isaddList = false;
			
			next()
		},
		methods: {
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
			async getlist() {
				var type = this.type;
				var id = this.id;
				var res = await getDataList(type,id);
				this.loading = false;
				
				if(type ==='album'){
					this.list = res.songs;
					this.album = res.album;
				}
				if(type === 'playlist'){
					this.list = res.playlist.tracks;
				}
			},
			options: function(song) {
				this.$refs.optionslist.show(song);
			},
			showToast: function() {
				this.toast = true;
				var that = this;
				setTimeout(function() {
					that.toast = false;
				}, 700)
			},
			close: function() {
				this.detailWrap = false;
			},
			show:function(){
				this.detailWrap = true;
			},
			toMv:function(song){
				this.$router.push({path:'/playMv',query:{id:song.mv,name:song.name}})	
			},
			addlist: function() {
				this.emptyList();
				var that = this;
				this.list.forEach(function(song, index) {
					that.addSongList({
						'audio': {
							id: song.id,
							singer: song.ar[0].name||'',
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
				if(!this.isaddList) {
					this.addlist();
					this.isaddList = true;
				}
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
			}
		},
		components: {
			optionsList,
			loading
		},
		filters: {
			slice: function(val) {
				var val = val||'';
				var temp = val.length > 7 ? '...' : '';
				//console.log(val.subStr)
				return val.substring(0, 5) + temp;
			}
		}
	}
</script>
<style type="text/css" scoped>
	img {
		width: 100%;
		height: 100%;
	}
	
	.listDatil {
		position: relative;
	}
	
	.detailWrap {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 1000;
		color: #fff;
		background: rgba(177, 177, 174, 0.8);
		overflow: auto;
	}
	/*.detailWrap .bg{
		background: #000000;
		opacity: 0.9;
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: -1;
	}*/
	
	.detailWrap .detailMain {
		box-sizing: border-box;
		padding:6rem 0;
		position: relative;
	}
	
	.detailWrap .detailMain .close{
		position: absolute;
		top:2rem;
		right: 2.2rem;
		cursor: pointer;
	}
	.detailWrap .img {
		width: 24rem;
		height: 24rem;
		margin: 0 auto;
	}
	
	.detailWrap .title {
		padding: 2.5rem 0 4rem 0;
		text-align: center;
		font-size: 1.6rem;
	}
	
	.detailWrap .content {
		padding: 0 2rem;
		text-align: center;
	}
	
	.detailWrap .bottom {
		display: block;
		width: 6rem;
		padding: 0.5rem 0;
		margin: 0 auto;
		position: relative;
		margin-top: -4rem;
		text-align: center;
		border: 1px solid #fff;
		border-radius: 1rem;
	}
	
	.header {
		padding-top: 1.4rem;
		height: 5.8rem;
		box-sizing: border-box;
		position: fixed;
		z-index: 3;
		width: 100%;
		overflow: hidden;
		font-size: 2rem;
	}
	
	.header .goBack {
		position: absolute;
		top: 1.5rem;
		font-size: 2rem;
		line-height: 2rem;
		margin-left: 1.2rem;
		z-index: 4;
	}
	
	.header .goBack i {
		color: rgb(224, 217, 212);
		font-size: 2.8rem;
		cursor: pointer;
	}
	
	.header .playtitle {
		margin-left: 5.5rem;
		padding: 1rem 0;
		width: 18rem;
		font-size: 1.8rem;
		color: #fff;
		overflow: hidden;
	}
	
	.header .playtitle .needScroll {}
	
	.header .playtitle .scrollBar {
		word-break: keep-all;
		white-space: nowrap;
	}
	
	.songIntro {
		height: 22.5rem;
		box-sizing: border-box;
		padding: 6.8rem 1.7rem 0;
		position: relative;
		overflow: hidden;
	}
	
	.showBg {
		position: absolute;
		left: 0;
		top: 0;
		height: 0;
		height: 100%;
		width: 100%;
		z-index: -1;
		background-size: cover;
		filter: blur(4rem);
		-webkit-filter: blur(4rem);
	}
	
	.bgPostion {
		filter: blur(1.8rem);
	}
	
	.songIntro .songImg {
		width: 15.1rem;
		height: 14.7rem;
	}
	
	.songIntro .aboutSong {
		margin-left: 17.1rem;
		color: #ECF0F1;
	}
	
	.aboutSong .name {
		font-size: 2rem;
		padding-top: 0.8rem;
		line-height: 2.1rem;
		margin-bottom: 2.2rem;
	}
	
	.aboutSong .singer {
		padding: 0.9rem 0 0 3.8rem;
		height: 3.4rem;
		font-size: 1.4rem;
		position: relative;
		cursor: pointer;
	}
	
	.aboutSong .singer .headerImg {
		width: 3.3rem;
		height: 3.3rem;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 50%;
	}
	
	.singer .headerImg img {
		border-radius: 50%;
	}
	
	.aboutSong .singer .icon {
		padding-left: 1rem;
	}
	
	.playContrl {
		overflow: hidden;
		box-sizing: border-box;
		padding: 1.4rem 1.2rem;
		border-bottom: 1px solid #ccc;
	}
	
	.playContrl:after {
		clear: both;
	}
	
	.playAll {
		cursor: pointer;
		width: 20rem;
		float: left;
		font-size: 1.7rem;
		color: #000000;
		font-weight: 100;
		line-height: 100%;
	}
	
	.playAll .icon {}
	
	.playAll .allnum {
		color: #ccc;
	}
	
	.playList {
		padding-bottom: 5.6rem;
		overflow: hidden;
		position: relative;
	}
	
	.playList li {
		position: relative;
		padding: 1.2rem 1.5rem;
		cursor: pointer;
	}
	
	.playList li .cutline {
		height: 1px;
		position: absolute;
		width: 98%;
		background: radial-gradient(#d3d3d3 -90%, transparent 100%);
		bottom: 0;
	}
	
	.playList li span,
	.playList li i {
		display: inline-block;
		vertical-align: middle;
	}
	
	.playList li .index {
		font-style: normal;
		width: 4rem;
		color: #ccc;
		text-indent: 1rem;
	}
	
	.playList li .bold {
		color: #000000;
	}
	
	.playList li .songTitle {
		width: 27rem;
		font-size: 1.2rem;
		color: #ccc;
	}
	
	.songTitle .nameRow {
		font-weight: 200;
		color: #000000;
		font-size: 1.6rem;
		padding-bottom: 1rem;
	}
	.songTitle .nameRow i{
		padding-top: 0.1rem;
		display: inline-block;
		line-height: 100%;
	}
	.songTitle .nameRow i.name{
		word-break: keep-all;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		max-width: 80%;
	}
	.playList li .option {
		width: 1rem;
		color: #ccc;
	}
</style>