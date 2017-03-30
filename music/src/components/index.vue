<template>
	<div class="index">
		<head-Top :headTitle='headTitle' :goBack='goBack' :isSearch='isSearch'></head-Top>
		<mu-tabs :value="activeTab" @change="handleTabChange" class='mutabs' >
			<mu-tab value="recommend" title="热门推荐" />
			<mu-tab value="playListDisplay" title="歌单" />
			<mu-tab value="like" title="主题" />
			<mu-tab value="home" title="排行榜" />
		</mu-tabs>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>
<script type="text/javascript">
	import headTop from './commHeader/header.vue';
	import {
		mapGetters
	} from 'vuex';
	const TAB_NAME = ['推荐', '排行', '歌单']
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
			}
		},
		watch: {
			'$route':'changeHandle'
		},
		components: {
			headTop,

		}
	}
</script>
<style type="text/css" scoped>
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