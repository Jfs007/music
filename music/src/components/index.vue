<template>
	<div class="index">
		<head-Top :headTitle='headTitle' :goBack='goBack' :isSearch='isSearch'>
			<span slot="leftOption" class="slideBar" @click.stop='showSlideBar'>
				<i class="iconfont icon-caidan"></i>
			</span>
		</head-Top>
		<mu-tabs :value="activeTab" @change="handleTabChange" class='mutabs' >
			<mu-tab value="recommend" title="热门推荐" />
			<mu-tab value="playListDisplay" title="歌单" />
			<mu-tab value="like" title="主题" />
			<mu-tab value="home" title="排行榜" />
		</mu-tabs>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		<div class="loadWrap" v-if=false>
			
		</div>
		<slide-bar ref='slideBar'></slide-bar>
	</div>
</template>
<script type="text/javascript">
	import slideBar from './cmm/slideBar';
	import headTop from './commHeader/header.vue';
	import {
		mapGetters
	} from 'vuex';
	export default {
		name: 'index',
		data: function() {
			return {
				isSearch: true,
				activeTab: 'recommend',
				blooen: true,
				headTitle: '音乐 热爱你我',
				goBack: false,
			}
		},
		mounted:function(){
			var that = this.$route;
			this.changeHandle(that);
		},
		methods: {
			handleTabChange: function(val) {
				this.activeTab = val;
				this.$router.push({
					path: '/index/' + val
				})
			},
			changeHandle:function(that){
				
				const path = that.path
				var tmpArr = path.split('/')
				if(tmpArr[1] === 'index') {
					this.handleTabChange(tmpArr[2])
				}
				
			},
			showSlideBar:function(){
				this.$refs.slideBar.toggle(true);
			}
		},
		watch: {
			'$route':'changeHandle'
		},
		components: {
			headTop,
			slideBar
		}
	}
</script>
<style type="text/css" scoped>
	.slideBar{
		cursor: pointer;
		position: absolute;	
		left:1rem;
		display: block;
		color:#fff;
		width:0.5rem;
		margin-top: 2.0rem;
	}
	.loadWrap{
		position: fixed;
		top:0;
		left: 0;
		bottom: 0;
		right: 0;
		background: rgb(22,23,24);
		z-index: 100;
	}
	.mutabs {
		width: 100%;
		position: fixed;
		top: 5.5rem;
		height: 4.5rem;
		background: #fff;
	}
	
	.mutabs .mu-tab-link {
		color: rgb(131, 134, 133);
	}
	
	.mutabs .mu-tab-active {
		color: #000000;
	}
	
	.tab {
		padding-top: 5.5rem;
	}
	
	.tab .swiper-pagination {
		display: flex;
	}
	
	.swiper-pagination>span {
		position: relative;
		flex: 1;
		padding: 0.8rem 15px;
		text-align: center;
	}
	
	.list-group {
		overflow: hidden;
		position: fixed;
		top: 5.5rem;
	}
	
	.list-group:after {
		clear: both;
	}
	
	.list-group a {
		float: left;
		background: #fff;
		padding: 1.8rem 15px;
		font-size: 1.0rem;
		box-sizing: border-box;
		border: 1px solid #ecf0f1;
		width: 12rem;
		text-align: center;
	}
	
	.list-group .router-link-active {
		background: #2c3e50;
		color: #fff;
	}
</style>