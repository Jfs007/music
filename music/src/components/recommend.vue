<template>
	<div class="recommend">
		<div id="slider">
			<swiper :options="swiperOption">
				<swiper-slide><img src="../comm/img/banner1.jpg" class="banner-item" alt=""></swiper-slide>
				<swiper-slide><img src="../comm/img/banner2.jpg" class="banner-item" alt=""></swiper-slide>
				<swiper-slide><img src="../comm/img/banner3.jpg" class="banner-item" alt=""></swiper-slide>
				<swiper-slide><img src="../comm/img/banner4.jpg" class="banner-item" alt=""></swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
		</div>
		<div class="main">
			<div class="section rage">
				<p class="title" @click="toPlayListDisplay()">
					推荐歌单
					<i class="iconfont icon-sanjiao"></i>
				</p>
				<ul class="list threeBlock">
					<li v-for="item in songlist" @click='play(item)'>
						<div class="imgDisplay">
							<span class="playCount"><i class="iconfont icon-tools-erji-copy"></i>{{item.playCount | countConvert}}</span>
							<img v-lazy="item.coverImgUrl" lazy='loading'/>
						</div>
						<p class="msg">{{item.name}}</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import {
		america,
		getAlbums,
		getSongList
	} from '../api/getData.js';
	export default {
		data: function() {
			return {
				songlist: [],
				swiperOption: {
					pagination: '.swiper-pagination',
					paginationClickable: true
				},
			}
		},
		mounted: function() {
			this.getHot()
		},
		methods: {
			async getHot() {
				var res = await getSongList('', 0, 6);
				this.songlist = res['playlists'];
				console.log(this.songlist, '......async')
			},
			toPlayListDisplay: function() {
				this.$router.push({
					path: '/index/playListDisplay/0'
				})
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
						type: 'playlist'
					}
				})
			}
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
			}
		},
		components:{
			 swiper, 
			 swiperSlide
		}
	}
</script>
<style type="text/css" scoped>
	.recommend {
		padding-top: 10.1rem;
		padding-bottom: 5.5rem;
		overflow: hidden;
	}
	img {
		width: 100%;
		height: 100%;
	}
	img[lazy=loading] {
    /*your style here*/
   		background: url(../../static/banner-item-load.png) no-repeat;
   		background-size: contain;
   		background-size: 100% 100%;
  }
	.title {
		font-size: 1.5rem;
		line-height: 1.6rem;
		margin-bottom: 1.2rem;
		border-left: 0.4rem solid #000000;
		padding-left: 1rem;
		cursor: pointer;
	}
	
	.section {
		padding-top: 2rem;
	}
	
	.section .list {
		margin-left: -0.2rem;
	}
	
	.section .list li {
		float: left;
		margin-left: 0.2rem;
		margin-bottom: 1.2rem;
	}
	
	.section .oneBlock li {
		width: 36rem;
	}
	
	.section .twoBlock li {
		width: 17.8rem;
	}
	
	.section .threeBlock li {
		width: 11.79rem;
	}
	
	.mv .list li {
		height: 9rem;
	}
	
	.rage .imgDisplay {
		display: block;
		height: 11.79rem;
		position: relative;
	}
	
	.rage .playCount {
		position: absolute;
		right: 0.3rem;
		font-size: 1.2rem;
		top: 0.3rem;
		color: #fff;
	}
	
	.rage .msg {
		padding: 1rem 0.5rem;
		font-size: 1.3rem;
		line-height: 1.4rem;
		height:4.5rem;
	}
</style>