<!--这里是歌单-->
<template>
	<div class="ablums">
		<div class="primeSong">
			<div class="primeBg" :style="{background: 'url('+primeSong.coverImgUrl+')'}"></div>
			<p class="imgArea fl"><img v-lazy='primeSong.coverImgUrl'
				loay='loading'
				 /></p>
			<ul class="songMsg">
				<li class="more">
					<router-link to='/primeSong?cat=榜单'>
						精品歌单 >
					</router-link>
				</li>
				<li class="name">{{primeSong.name}}</li>
				<li class="description">{{primeSong.description}}</li>
			</ul>
		</div>
		<div class="listType">
			<div class="currentType fl">全部歌曲</div>
			<ul class="selectType">
				<li v-for='(sl,index) in selects' @click='selectType(index)'>{{sl}}</li>
			</ul>
		</div>
		<div class="songList" v-load-more="moreSong">
			<loading  v-if='initloading' class='initload'></loading>
			<ul>
				<li v-for='item in songlist' @click='play(item)'>
					<div class="songImg">
						<span class="playCount"><i class="iconfont icon-tools-erji-copy"></i>{{item.playCount | countConvert}}</span>
						<img  v-lazy="item.coverImgUrl" lazy='loading'/>
					</div>
					<p class="msg">{{item.name | toRule}}</p>
				</li>
			</ul>
			<div class="loadMore" v-if='loading'>
				<loading v-if='loading' :loadText='loadText' class='loading'></loading>
			</div>
		</div>

	</div>
</template>

<script>
	import loading from './cmm/loading.vue';
	import { loadMore } from '../comm/loadMore.js';
	import {
		mapMutations,
		mapActions
	} from 'vuex';
	import {
		america,
		getAlbums,
		getSongList
	} from '../api/getData.js';
	export default {
		name: 'playListDisplay',
		data() {
			return {
				msg: '这里是about',
				songlist: [],
				primeSong: {},
				loading: false,	
				loadText:'加载更多',
				loadingText: '正在加载..',
				preventRepeatReuqest: false,
				scroller:null,
				offset: 0,
				initloading: true,
				selects: ['华语', '欧美', '粤语'],
				currentType: 0,
			}
		},
		mounted: function() {
			this.scroller = this.$el;
			this.initData(this.currentType)
		},
		beforeRouteUpdate: function(to, from, next) {
			this.songlist = [];
			this.changeData(this.currentType);
			next()
		},
		methods: {
			async moreSong() {
				if(this.preventRepeatReuqest) {
					return;
				}
				var cat = this.selects[this.currentType]
				this.preventRepeatReuqest = true;
				this.loading = true;
				var that = this;
				var res = await getSongList(cat, this.offset, 8);
				var songlist = res.playlists;
				//var songlist = this.filterData(songs,this.from,this.to);
				console.log(songlist[0])
				this.offset += 8;
				if(songlist.length < 8) {
					this.loadingText = '没有了哦';
					setTimeout(function() {
						that.loading = false;
					}, 800)
					return;
				}
				[].push.apply(this.songlist, songlist);
				this.preventRepeatReuqest = false;
				this.loading = false;
			},
			async initData(currentType) {
				this.initloading = true;
				var cat = this.selects[currentType];
				let res = await getSongList(cat, 0, 8);
				//获取热们歌单
				let reshot = await getSongList('榜单', 0, 1) || {};
				//alert(typeof reshot)
				this.primeSong = reshot['playlists'][0];
				// 其他
				this.offset += 8;
				this.songlist = res['playlists'];
				this.initloading = false;
			},
			async getData(){
				let cat = this.select[currentType];
				this.initloading = true;
			},
			async changeData(currentType) {
				this.initloading = true;
				var cat = this.selects[currentType];
				let res = await getSongList(cat, 0, 8);
				this.songlist = res['playlists'];
				this.initloading = false;
			},
			filterData: function(data, from, to) {
				var newData = [];
				newData = data.slice(from, to);
				return newData;
			},
			play: function(item) {
				this.$router.push({
					name: 'listDetail',
					params: {
						id: item.id,
						name: item.name,
						coverImg: item.coverImgUrl,
						creator: item.creator,
						count: item.playCount,
						desc: item.description,
						type:'playlist'
					}
				})
			},
			selectType: function(id) {
				//alert(id)
				this.currentType = id;
				this.$router.push({path: '/index/playListDisplay',query:{type:id}});
				//this.initData(index);
			},
			...mapMutations([
				'changeSong',
				'addSongList'
			]),
			...mapActions([])
		},
		filters: {
			sliceString: function(data, max) {
				var str = '';
				var needLength = max || 10;
				str = data.length > needLength ? data.substring(0, needLength) + '...' : data
				return str
			},
			countConvert: function(val) {
				var count = ''
				console.log(val, '...')
				count = (parseInt(val / 10000)) > 9 ? parseInt(val / 10000) + '万' : val;
				return count;
			},
			toRule:function(data){
				console.log(data)
				
				return data;
			}
		},
		mixins:[loadMore],
		components:{
			loading
		}

	}
</script>
<style type="text/css" scoped>
	.initload {
		left: 50%;
		top: 2rem;
		transform: translateX(-50%);
	}
	
	.ablums {
		padding-top: 10.1rem;
	}
	
	img {
    /*your style here*/ 
		width: 100%;
		height: 100%;
	}
	 img[lazy=loading] {
    /*your style here*/
   		background: url(../comm/img/banner-item-load.png) no-repeat;
   		background-size: contain;
   		background-size: 100% 100%;
  }
	.primeSong {
		padding: 2.4rem 0.6rem 1.6rem 0.6rem;
		background-size: 100% 100%;
		overflow: hidden;
		position: relative;
	}
	
	.primeBg {
		position: absolute;
		height: 15.3rem;
		width: 100%;
		z-index: -1;
		left: 0;
		top: 0;
		background-size: cover;
		filter: blur(3rem);
		-webkit-filter: blur(3rem);
	}
	
	.primeSong .imgArea {
		width: 11.3rem;
		height: 11.3rem;
	}
	
	.primeSong ul {
		margin-left: 12.6rem;
	}
	
	.primeSong:after {
		clear: both;
	}
	
	.primeSong li {
		padding-bottom: 1rem;
		color: #fff;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		width: 100%;
	}
	
	.primeSong .more {
		font-size: 2.2rem;
		line-height: 2.2rem;
		padding-bottom: 2rem;
		padding-top: 1.2rem;
		cursor: pointer;
	}
	
	.primeSong .more a {
		color: #fff;
	}
	
	.primeSong .name {
		font-size: 1.6rem;
	}
	
	.primeSong .description {
		color: #C3C3C3;
	}
	
	.listType {
		padding: 1.7rem 1.5rem;
		overflow: hidden;
	}
	
	.listType .currentType {
		width: 10rem;
		text-align: center;
		box-sizing: border-box;
		padding: 0.8rem 1.3rem;
		border: 1px solid #ccc;
		border-radius: 20rem;
		float: left;
	}
	
	.listType .selectType {
		float: right;
		margin-top: 1.18rem;
		cursor: pointer;
	}
	
	.listType .selectType li {
		padding: 0 1.1rem;
		border-right: 1px solid #ccc;
		float: left;
		cursor: pointer;
	}
	
	.songList {
		width: 100%;
		position: relative;
		min-height: 10rem;
		overflow: hidden;
	}
	
	.songList ul {
		margin-left: -0.2rem;
		overflow: hidden;
	}
	
	.songList ul li {
		float: left;
		width: 17.8rem;
		margin-left: 0.2rem;
		margin-bottom: 1rem;
	}
	
	.songList .songImg {
		width: 100%;
		height: 17.75rem;
		padding-bottom: 1rem;
		position: relative;
	}
	.songList .songImg .playCount {
		position: absolute;
		right: 0.3rem;
		font-size: 1.2rem;
		top: 0.3rem;
		color: #fff;
	}
	
	.songList .msg {
		padding: 0 0.5rem;
		font-size: 1.5rem;
		line-height: 1.6rem;
		height: 3.2rem;
	}
	
	.mu-infinite-scroll {
		margin-bottom: 6rem;
	}
	.loadMore{
		height: 2.5rem;
		text-align: center;
		line-height: 2.5rem;
		color: #008000;
		box-sizing: content-box;
		padding-bottom: 8.6rem;
		position: relative;
	}
	.loadMore .loading{
		top:1rem;
	}
</style>