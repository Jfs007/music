<template>
	<div class="playBar">
		<div class="playmini" >
			<div class="cover fl" @click='showDetail(audio.id)'>
				<img src="../../assets/player-bar.png" class="imgLoading" v-show='loading' />
				<img :src="audio.albumPic" />
			</div>
			<ul class="msg fl">
				<li class="songName">{{audio.name}}</li>
				<li class="songer">{{audio.singer}}</li>
			</ul>
			<div class="rightContrl fr">
				<span class="togglePlay" @click='togglePlay'><i :class="[ 'iconfont',isPlay ? 'icon-bofang' : 'icon-weibiaoti1']"></i></span>
				<span class="list" @click="showlist"><i class="iconfont icon-liebiao-copy"></i></span>
			</div>
		</div>
		<songlist ref='songlist'></songlist>
		<audio class="audioDom" id="myaudio"
			:src="audio.location" 
			@canplay="canplay"  
			@timeupdate="timeupdate" 
			@loadedmetadata="loadedmetadata"
			@emptied="emptied"
			@ended="endPlay"
			@progress="progress"
			@canplaythrough= 'canplaythrough'
			@error='error'
			autoplay
			></audio>
	<slide :activePro='posCurrTime' :pro='posBufferTime' :botShow='botShow' class='slide'></slide>
	</div>
</template>

<script type="text/javascript">
	import {
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex';
	import songlist from '../cmm/list.vue';
	import slide from '../cmm/slide.vue';
	export default {
		data: function() {
			return {
				bottomPopup: false,
				botShow:false
			}
		},
		computed: {
			...mapGetters([
				'isPlay',
				"isChange",
				'audio',
				'currTime',
				'durationTime',
				'posCurrTime',
				'posBufferTime',
				'playType',
				'loading'
			]),
		},
		methods: {
			...mapActions([
				'nextPlay'
			]),
			...mapMutations([
				'play',
				'pause',
				"setDurationTime",
				'setBufferTime',
				'setCurrTime',
				'setChange',
				'setShowDetail',		
				'setPosCurrTime'
			]),
			showDetail:function(id){
				console.log('show id',id,'...........');
				this.$router.push({name: 'playDetail', params: {id:id}});
				this.setShowDetail(false);
			},
			showlist: function() {
				console.log('yes')
				this.$refs.songlist.show();
			},
			togglePlay: function() {
				var audio = document.getElementById('myaudio');
				console.log('contral')
				if(this.isPlay) {
					this.pause();
					audio.pause()
				} else {
					this.play();
					audio.play();
				}
			},
			error:function(){
				var audio = document.getElementById('myaudio');
				audio.pause();
				this.pause();			
				console.log('出错了');
			},
			canplay: function() {
				//alert('kaishi')
				var audio = document.getElementById('myaudio');
				this.play();
				audio.play();
			},			
			endPlay:function(){
				var audio = document.getElementById('myaudio');
				var playType = this.playType;
				//audio.push();
				if(playType ==='单曲循环'){
					audio.play();
				}
				else if(playType ==='列表循环'){
				console.log('播放下一首')
				this.nextPlay();
				}						
			},
			loadedmetadata:function(){
				var audio = document.getElementById('myaudio');
				console.log('你会被触发吗',audio.duration)
				this.setDurationTime(parseInt(audio.duration));
			},
			emptied:function(){
				var audio = document.getElementById('myaudio');
				this.pause();
				audio.pause();				
			},
			progress:function(){
				var audio = document.getElementById('myaudio');
				var timeRages = audio.buffered;
				var that = this;
				if(timeRages.length > 0 && audio.duration > 0){
					console.log( timeRages.end(timeRages.length - 1),'...缓存',audio.duration)
					that.setBufferTime(timeRages.end(timeRages.length - 1))
				}
			},
			canplaythrough:function(){
				var audio = document.getElementById('myaudio');
				var timeRages = audio.buffered;
				var that = this;
				if(timeRages.length > 0 && audio.duration > 0){
					console.log( timeRages.end(timeRages.length - 1),'...缓存',audio.duration)
					that.setBufferTime(timeRages.end(timeRages.length - 1))
				}
			},
			timeupdate:function(){
				var audio = document.getElementById('myaudio');
				var buffer = audio.buffered;
				var that = this;			
				if(this.isChange){
					this.setChange(false);
					audio.currentTime = this.currTime;
				}else{
					this.setCurrTime(audio.currentTime);
					console.log(this.currTime,'currTime')
				}
				this.setDurationTime(audio.duration);
			}
			
		},
		components:{
			songlist,
			slide
		},
		filters: {
			slice: function() {

			}
		}
	}
</script>
<style type="text/css" scoped>
	img {
		width: 100%;
		height: 100%;
	}
	
	.audioDom {
		display: none;
	}
	
	.playBar {
		height: 5.6rem;
		width: 100%;
		position: fixed;
		bottom: 0;
		box-sizing: border-box;
		padding: 0.7rem;
		z-index: 10;
		background: #fff;
	}
	
	.cover {
		width: 3.9rem;
		height: 3.9rem;
		position: relative;
	}
	.cover .imgLoading{
		position: absolute;
		top:0;
		left: 0;
		width:3.9rem;
		height: 3.9rem;
		z-index: 4;
	}
	.msg {
		margin-left: 1rem;
		width: 15rem
	}
	
	.msg .songName {
		margin-top: 1rem;
		padding-bottom: 0.2rem;
		font-size: 1.2rem;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.msg .songer {
		color: #ccc;
		font-size: 1.0rem;
	}
	
	.rightContrl {
		padding-right: -1rem;
		line-height: 2.9rem;
		color: #000;
	}
	
	.rightContrl span {
		display: inline-block;
		cursor: pointer;
		padding-left: 0.8rem;
		padding-top: .5rem;
	}
	
	.rightContrl span i {
		font-size: 2.9rem;
	}
	.demoPopupBottom{
		width:100%
	}
	.slide{
		position: absolute;
		bottom: 0rem;
		left: 0;
	}
</style>