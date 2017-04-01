<template>
	<div class="primeSong">
		<head-top :goBack='goBack' :isTitle='isTitle'>
			<div slot='title' class="mytitle">{{cat}}</div>
		</head-top>
		<ul class="songlist" v-load-more='getData'>
			<loading v-if='initloading' class='initloading'></loading>
			<li v-for='item in songlist' @click='play(item)'>
				<div class="songImg fl">
					<span class="playCount"><i class="iconfont icon-tools-erji-copy"></i>{{item.playCount | countConvert}}</span>
					<img :src="item.coverImgUrl" alt="" />
				</div>
				<div class="info">
					<p class="name">{{item.name}}</p>
					<p class="creator">by {{item.creator.nickname}}</p>
					<p class="msg">
						<i>{{item.tags[0]}}</i> {{item.description}}
					</p>
				</div>
			</li>
		</ul>
		<div class="loadMore" v-if='loading'><loading v-if='loading' :loadText='loadText' class='loading'></loading></div>
	</div>
</template>
<script type="text/javascript">
	import headTop from './commHeader/header.vue';
	import loading from './cmm/loading.vue';
	import { loadMore } from '../comm/loadMore.js';
	import {
		getSongList
	} from '../api/getData.js';
	export default {
		data: function() {
			return {
				loadText:'加载更多..',
				goBack: true,
				isTitle: false,
				cat: '',
				initloading: false,
				offset: 0,
				songlist: [],
				preventRepeatReuqest: false,
				loading: false,
				loadingText: '正在加载..'
			}
		},
		methods: {
			async getData(limit){
				limit = limit||4;
				if(this.preventRepeatReuqest){
					return;
				}
				this.offset>0&&(this.loading = true);
				this.preventRepeatReuqest = true;
				var res = await getSongList(this.cat,this.offset,limit);
				var songlist = res.playlists;			
				this.offset += limit;
				if(songlist.length<4){
					// 数据没了时候处理的事情...
				}
				// 加入进去
				[].push.apply(this.songlist, songlist);
				this.preventRepeatReuqest = false;
				this.loading = false;
			},
			async initData(){
				this.initloading = true;
				await this.getData(8);
				this.initloading = false;
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
		},
		components:{
			headTop,
			loading	
		},
		filters: {
			countConvert: function(val) {
				var count = ''
				console.log(val, '...')
				count = (parseInt(val / 10000)) > 9 ? parseInt(val / 10000) + '万' : val;
				return count;
			}
		},
		mixins:[loadMore],
		beforeRouteEnter: function(to, from, next) {
			next(vm => {
				vm.songlist = [];
				vm.offset = 0;
				vm.cat = to.query.cat;
				vm.initData();
				console.log(to, '..', to.query, to.query.cat)
			})
		}
	}
</script>
<style type="text/css" scoped>
	img {
		width: 100%;
		height: 100%;
	}
	
	.mu-infinite-scroll {
		margin-bottom: 6rem;
	}
	.initloading{
		top:9rem;
	}
	.mytitle {
		color: #fff;
		font-size: 2.0rem;
		margin-left: 4.5rem;
		position: absolute;
		top: 1.6rem;
	}
	
	.songlist {
		padding: 7rem 0 0 0;
		position: relative;
		min-height: 17rem;
	}
	
	.songlist li {
		box-shadow: 0px 0px 1px #ccc;
		background: #fff;
		margin-bottom: 1.2rem;
		height: 10rem;
		cursor: pointer;
	}
	
	.songlist .songImg {
		width: 10rem;
		height: 100%;
		position: relative;
	}
	
	.songlist .songImg .playCount {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		font-size: 1.2rem;
		color: #FFFFFF;
	}
	
	.songlist .info {
		margin-left: 10.8rem;
		overflow: hidden;
		padding-right: 1rem;
		height: 100%;
	}
	
	.songlist .info .name {
		margin: 0.8rem 0 1.5rem 0;
		font-size: 1.6rem;
	}
	
	.songlist .info .creator {
		font-size: 1.2rem;
		color: #ccc;
		margin-bottom: 0.8rem;
	}
	
	.songlist .info .msg {
		position: relative;
		width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		font-size: 1.2rem;
	}
	
	.songlist .info .msg i {
		display: inline-block;
		padding: 0.2rem 0.5rem;
		border: 1px solid #ccc;
		border-radius: 0.2rem;
		text-align: center;
	}
	.loadMore{
		height: 2.5rem;
		text-align: center;
		line-height: 2.5rem;
		color: #008000;
		box-sizing: content-box;
		padding-bottom: 7.6rem;
		position: relative;
	}
	.loadMore .loading{
		top:1rem;
	}
</style>