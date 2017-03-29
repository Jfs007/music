
<!--这里是歌单-->
<template>
	<div class="ablums">
		<div class="primeSong">
			<dis class="primeBg"></dis>
			<p class="imgArea fl"><img src="../../../sells/src/assets/logo.png" alt="" /></p>
			<ul class="fl">
				<li class="more">精品歌单</li>
				<li class="msg">如何优雅的扭动身体</li>
			</ul>			
		</div>
		<div class="songList">
			<mu-circular-progress :size="40" v-if='initloading' class='initload'/>
			<ul>
				<li v-for='song in songlist' @click='play(song)'>
					<div class="songImg"><img :src="song.albumpic_big"/></div>
					<p class="msg">{{song.songname | sliceString(20)}}</p>
				</li>
			</ul>
		</div>
		 <mu-infinite-scroll :loading="loading" @load="moreSong" :loadingText='loadingText' class="myInfinit"/>
		 
	</div>
</template>

<script>
	import {mapMutations,mapActions} from 'vuex';
	import { america , getAlbums } from '../api/getData.js';
	
	export default {
		name: 'about',
		mounted:function(){
			this.initData()
			console.log(this.$el,'about this el')
		},
		components:{
		},
		methods: {
			async moreSong(){
				if(this.preventRepeatReuqest){				
					return;
				}
				this.preventRepeatReuqest = true;
				this.loading = true;
				var that = this;
				var res = await america();
				var songs = res.showapi_res_body.pagebean.songlist;
				var songlist = this.filterData(songs,this.from,this.to);
				console.log(songlist[0])
				this.from+=20;
				this.to+=20;
				if(songlist.length<20){
					this.loadingText = '没有了哦';
					setTimeout(function(){
						that.loading = false;
					},800)
					return;
				}
				[].push.apply(this.songlist,songlist);		
				this.preventRepeatReuqest = false;
				this.loading = false;
			},
			async initData(){
				var res = await america();
				var songs = res.showapi_res_body.pagebean.songlist;
				var songlist = this.filterData(songs,0,20);
				console.log(songlist[0],songlist[0].albumid,songlist[1].albummid,songlist[0].seconds,songlist[0].songid,songlist[0].url)
				this.songlist = songlist;				
				this.initloading = false
			},
			filterData:function(data,from,to){
				var newData = [];
				newData= data.slice(from,to);
				return newData;
			},
			play:function(song){
				var audio = {};
				audio.location = song.url;
				audio.albumPic = song.albumpic_big;
				audio.albumPicSmall = song.albumpic_small;
				audio.id = song.songid;
				audio.name = song.songname;
				audio.singer = song.singername;
				this.addSongList(audio);
				this.changeSong();
			},
			...mapMutations([
				'changeSong',
				'addSongList'
			]),
			 ...mapActions([
			 ])
		},
		filters:{
			sliceString:function(data,max){
				var str = '';	
				var needLength = max || 10;
				str = data.length>needLength?data.substring(0,needLength)+'...':data
				return str 
			}
		},
		computed:{
			
		},
		data() {
			return {
				msg: '这里是about',
				songlist:[],
				loading:false,
				loadingText:'正在加载..',
				preventRepeatReuqest:false,
				from:20,
				to:40,
				initloading:true
			}
		}
	}
</script>
<style type="text/css" scoped>
	.initload{
		left: 50%;
		top:2rem;
		transform: translateX(-50%);
		
	}
	.ablums{
		padding-top: 10.1rem;
	}
	img{
		width:100%;
		height: 100%;
	}
	.primeSong{
		padding: 2.4rem 0.6rem 1.6rem 0.6rem;
		background-size: 100% 100%;
		overflow: hidden;
		position: relative;
	}
	.primeBg{
		position: absolute;
		height: 15.3rem;
		width:100%;
		z-index:-1;
		left: 0;
		top:0;
		background: url(../assets/5ED693A4-B45D-4C40-AF48-8A26389DA1DE.png) repeat-y ;
		background-size: cover;
		filter: blur(3rem);
		-webkit-filter: blur(3rem);
	}
	.primeSong .imgArea{
		width:11.3rem;
		height: 11.3rem;
		background: gray;
	}
	.primeSong ul{
		margin-left: 1.2rem;
	}
	.primeSong :after{
		clear: both;
	}
	.primeSong li{
		padding-bottom: 1rem;
		color: #fff;
	}
	.primeSong .more{
		font-size: 2.2rem;
		line-height: 2.2rem;
		padding-bottom: 1.3rem;
		padding-top: .6rem;
		
	}
	.primeSong .msg{
		font-size: 1.6rem;
	}
	.songList{
		margin-top: 0.6rem;
		width:100%;
	}
	.songList ul{
		margin-left: -0.2rem;
	}
	.songList ul li{
		float: left;
		width:17.8rem;
		margin-left: 0.2rem;		
		margin-bottom: 1rem;
	}
	.songList .songImg{
		width:100%;
		height: 17.75rem;
		padding-bottom: 1rem;
	}
	.songList .msg{
		padding: 0 0.5rem;
		font-size: 1.6rem;
		line-height: 1.6rem;
		height: 3.2rem;
	}
	.mu-infinite-scroll{
		margin-bottom: 6rem;
	}
</style>