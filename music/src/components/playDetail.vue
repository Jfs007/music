<template>
	<div class="playDetail">
		<div class="header">
			<span class="goBack" @click='$router.go(-1)'><i class='iconfont icon-fanhui'></i></span>
			<div class="playtitle">
				<p class="name">{{audio.name}}</p>
				<p class="singer">{{audio.singer}}</p>
			</div>
			<div class="bottomLine"></div>
		</div>
		<div class="pageBg">
			<div class="wrap" :style="{'background-image':'url(' + audio.albumPic + ')'}" 
				lazy='loading'
				></div>
		</div>
		<div class="playPage">
			<div class="lyricWrap" @click='closeLyricWrap' v-show='lyricWrap'>
				<ul class="lyric">
					<li v-for=' lyc in lyric'>{{lyc.txt}}</li>
				</ul>
			</div>
			<div class="cd" v-show='!lyricWrap' @click='showLyricWrap'>
				<div :class="['stick',isPlay?'stickPlay':'']"><img src="../assets/stick_bg.png" /></div>
				<div :class="['cdWrap',isPlay?'cdRotate':'']">
					<div class="img">
						<img :src="audio.albumPic" alt="" />
					</div>
				</div>
			</div>
			<div class="songOptions" v-show='!lyricWrap'>
				<i class="iconfont icon-xiai"></i>
				<i class="iconfont icon-xiazai"></i>
				<i class="iconfont icon-pinglun1" @click='toComments(audio.id)'></i>
				<i class="iconfont icon-diandian"></i>
			</div>
		</div>
		<!--控制相关进度-->
		<div class="playContrl">
			<div class="promini">
				<span class="currTime time">{{currTime | converTime}}</span>
				<div class="progress">
					<slide :activePro='posCurrTime' :pro='posBufferTime' @changes='changeTime'></slide>
				</div>
				<span class="durationTime time">{{durationTime | converTime}}</span>
			</div>
			<div class="contral">
				<span class="playType" @click='changeType'>
					<i class="iconfont icon-danquxunhuan" :class="['iconfont',playTypes[currentType]]"></i>
				</span>
				<p class="fl">
					<span class="prev" @click="prev"></span>
					<span :class="[isPlay?'play':'pause' ,'toggle']" @click='togglePlay'></span>
					<span class="next" @click="next"></span>
				</p>
				<span class="list fr" @click="showlist"></span>
			</div>
		</div>
		<songlist ref='songlist'></songlist>
	</div>
</template>
<script type="text/javascript">
	import songlist from './cmm/list.vue';
	import slide from "./cmm/slide.vue";
	import {
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex';
	import {
		getLrc
	} from '../api/getData.js';
	export default {
		data: function() {
			return {
				lyricWrap: false,
				activePro: 0,
				pro: 0,
				boVal: 0,
				templyric: '',
				lyric: [],
				isLoadLyric: false,
				audioOldId:0,
				isLoad:false,
				currentType:0,
				playTypes:['icon-liebiaoxunhuan','icon-danquxunhuan'],
				playTypesName:['列表循环','单曲循环'],
				imgUrl:''
			}
		},
		mounted: function() {
			var that = this;
			console.log(this.posCurrTime, this.posBufferTime, '.........')
		},
		beforeRouteEnter: function(to, from, next) {
			console.log('.........11112.',to.params)
			next(vm => {
				//alert('luyou')
				console.log('.........路又刷新')
				if(to.params.id!==vm.audioOldId){			
					console.log('vm：id' + vm.audio.id);
					vm.setShowDetail(false);
					vm.isLoadLyric = false;
					vm.isLoad = false;
					vm.lyric = [];
					vm.audioOldId = to.params.id;
				}
				
			})
		},
		beforeRouteUpdate:function(to, from, next) {
				//alert('...')
   				this.isLoadLyric = false;
   				this.lyric = [];
   				next();
  		},
		methods: {
			async getLrcAndConvert() {
				var res = await getLrc(this.audio.id);
				var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
				var minReg = /\[\d*/i;
				var secondReg = /\:\d*/i;
				if(res.nolyric) {
					this.templyric = '没有歌词哦!'
				} else {
					var lyrics = res.lrc.lyric;
					var convertLyric = lyrics.split('\n');
					for(var i = 0; i < convertLyric.length; i++) {
						var lyricObj = {};
						//时间
						var getTime = convertLyric[i].match(timeReg);
						if(!getTime) continue;
						// 歌词
						var lyric = convertLyric[i].replace(timeReg, '');
						var min = parseInt(getTime[0].match(minReg)[0].slice(1));
						var second = parseInt(getTime[0].match(secondReg)[0].slice(1));
						var convertTime = min * 60 + second;
						lyricObj.time = convertTime;
						lyricObj.txt = lyric;
						this.lyric.push(lyricObj);
					}
				}
				//查看用，，，没别的作用
				for(var j = 0; j < this.lyric.length; j++) {
					console.log(this.lyric[j].txt, '歌词', this.lyric[j].time)
				}
			},
			showLyricWrap: function() {
				if(!this.isLoadLyric) {
					this.getLrcAndConvert();
					this.isLoadLyric = true;
				}
				this.lyricWrap = true;
			},
			closeLyricWrap: function() {
				this.lyricWrap = false;
			},
			changeTime: function(val) {
				console.log(val, '!!!');
				val = val > 1 || val < 0 ? 0 | val : val;
				this.setCurrTime(val * this.durationTime);
				console.log(parseInt(val * this.durationTime), 's...time')
				this.setChange(true);
				//this.posCurrTime = val;
			},
			
			togglePlay: function() {
				var audio = document.getElementById('myaudio');
				if(this.isPlay) {
					this.pause();
					audio.pause();
				} else {
					this.play();
					audio.play();
				}
			},
			async next(){			
				await this.nextPlay()				
				this.$router.replace({name: 'playDetail', params: {id:this.audio.id}})
			},
			async prev(){
				//alert(this.audio.id,'zhiqian')
				console.log(this.audio.id,'zhiqian')
				await this.prevPlay()
				//alert(this.audio.id,'zhihou')
				console.log(this.audio.id,'zhihou')
				this.$router.replace({name: 'playDetail', params: {id:this.audio.id}})
			},
			showlist: function() {
				console.log('yes')
				this.$refs.songlist.show();
			},
			changeType:function(){
				var length = this.playTypes.length;
				this.currentType++;
				this.currentType = this.currentType%length;
				this.setPlayType(this.playTypesName[this.currentType]);
			},
			toComments:function(id){
				this.$router.push({name:'comments',params:{id:id}})	
			},
			...mapActions([
				'prevPlay',
				'nextPlay'
			]),
			...mapMutations([
				'setChange',
				'setCurrTime',
				'setShowDetail',
				'play',
				'pause',
				'setPlayType'
			])
		},
		computed: {
			...mapGetters([
				'audio',
				'isPlay',
				"change",
				'durationTime',
				'posCurrTime',
				'posBufferTime',
				'currTime'

			]),
		},
		filters: {
			converTime: function(val) {
				var second = parseInt( val % 60 );
				if(second < 10) {
					second = '0' + second;
				}
				var min = parseInt(val / 60);
				if(min < 10) {
					min = '0' + min;
				}
				return min + ':' + second;
			}
		},
		components: {
			slide,
			songlist
		},
		beforeRouteLeave: function(to, from, next) {
			this.setShowDetail(true);
			this.lyricWrap = false;
			next()
		},
	}
</script>
<style type="text/css" scoped>
	img {
		height: 100%;
		width: 100%;
	}
	
	.header {
		padding-top: .6rem;
		height: 5.6rem;
		position: relative;
	}
	
	.header .goBack {
		position: absolute;
		top: 1rem;
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
		width: 16rem;
	}
	
	.playtitle .name {
		font-size: 1.8rem;
		color: #fff;
		font-weight: 90;
		font: "arial rounded mt bold";
		padding-bottom: 0.2rem;
		padding-top: 0.7rem;
		overflow: hidden;
		width: 100%;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.playtitle .singer {
		font-size: 1.3rem;
		font-weight: 100;
		color: #c3c3c3;
	}
	
	.bottomLine {
		width: 98%;
		height: 0.08rem;
		margin: 1.2rem auto 0;
		background: radial-gradient(#d3d3d3 -90%, transparent 100%);
		position: absolute;
		bottom: 0;
		left: 0;
	}
	
	.pageBg {
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
		z-index: -1;
	}
	
	.pageBg .wrap {
		background-size: cover;
		filter: blur(0.3rem);
		-webkit-filter: blur(3.3rem);
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
	}
	.pageBg .wrap[lazy=loading]{
		background: darkgray;
	}
	.playPage {
		position: relative;
		padding-top: 8rem;
		height: 46rem;
		overflow: hidden;
		box-sizing: border-box;
	}
	
	.playPage .lyricWrap {
		position: absolute;
		z-index: 10;
		left: 0;
		bottom: 0;
		right: 0;
		top: 0;
	}
	
	.lyricWrap .lyric {
		margin-top: 1rem;
		height: 46rem;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}
	
	.lyricWrap .lyric li {
		font-size: 1.6rem;
		color: #fff;
		text-align: center;
		padding: 1.2rem 0;
	}
	
	.playPage .stick {
		position: absolute;
		width: 12rem;
		height: 17rem;
		top: -2.5rem;
		left: 50%;
		z-index: 3;
		margin-left: -3rem;
		transform-origin: 2.1rem 2.5rem;
		transform: rotateZ(-15deg);
		transition: all 1s;
	}
	
	.playPage .stickPlay {
		transform: rotateZ(0deg);
	}
	
	.playPage .cdWrap {
		width: 28rem;
		height: 28rem;
		position: relative;
		margin: 0 auto;
		border-radius: 50%;
		padding: 2rem;
		background: hsla(0, 0%, 42%, .3);
		-webkit-transform: rotate(0deg);
		-moz-transform: rotate(0deg);
		-ms-transform: rotate(0deg);
		transform: rotate(0deg);
	}
	
	.playPage .cdRotate {
		-webkit-animation: rotating 10s linear .3s infinite;
		animation: rotating 10s linear .3s infinite;
	}
	
	@-webkit-keyframes rotating {
		0% {
			-webkit-transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
		}
	}
	
	@keyframes rotating {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	
	.playPage .cdWrap .img {
		width: 100%;
		height: 100%;
	}
	
	.cdWrap .img img {
		border-radius: 50%;
	}
	
	.playPage .cdWrap .warp {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 2;
		width: 100%;
		height: 100%;
		background: url(../assets/cd_wrapper.png) no-repeat;
		background-size: contain;
	}
	.playPage .songOptions{
		margin-top: 5rem;
		height: 5rem;
		padding: 1rem 2rem;
		box-sizing: border-box;
		text-align: center;
	}
	.playPage .songOptions i{
		cursor: pointer;
		display: inline-block;
		color: #fff;
		padding:0.75rem 2rem;
		font-size: 1.5rem;
	}
	.playContrl {
		padding: 0 1.8rem;
	}
	
	.promini {
		height: 3.2rem;
		position: relative;
	}
	
	.promini .time {
		width: 3rem;
		position: absolute;
		font-size: 1.2rem;
		padding: 1rem 0;
		text-align: center;
		color: #C3C3C3;
	}
	
	.promini .currTime {
		left: 0;
		top: 0;
	}
	
	.promini .durationTime {
		right: 0;
		top: 0;
	}
	
	.promini .progress {
		margin: 0 auto;
		width: 25rem;
		padding-top: 1.2rem;
	}
	
	.playContrl .contral {
		font-size: 0;
		overflow: hidden;
		width: 100%;
	}
	
	.playContrl .contral span {
		float: left;
		width: 5.5rem;
		height: 5.5rem;
		background-size: cover;
		cursor: pointer;
	}
	
	.contral .playType {
		line-height: 5.5rem;
		text-align: center;
	}
	.contral .playType i{
		line-height: 5.5rem;
		color: #fff;	
	}
	.contral .prev {
		background: url(../assets/prev_hover.png);
	}
	
	.contral .pause {
		background: url(../assets/pause.png);
	}
	
	.contral p {
		margin-left: 2.7rem;
	}
	
	.contral .play {
		background: url(../assets/play.png);
	}
	
	.contral .next {
		background: url(../assets/next_hover.png);
	}
	
	.contral .list {
		background: url(../assets/list.png);
	}
	
	.playContrl .contral i {
		font-size: 3rem;
	}
</style>