<template>
	<div class="comments">
		<head-top :goBack='goBack' :isTitle='isTitle'>
			<div slot='title' class="mytitle">评论 ({{total}})</div>
		</head-top>
		<div class="commentsItem">
			<ul class="toPlayDetail">
				<li class="img"><img :src="audio.albumPic"/></li>
				<li class="info">
					<p class="name">{{audio.name}}</p>
					<p class="singer">{{audio.singer}}</p>
				</li>
				<li class="toDetail" @click='$router.go(-1)'>
					<i class="iconfont icon-sanjiao"></i>
				</li>
			</ul>
			<p class="commentsTitle">精彩评论</p>
			<ul class="commentslist">
				<li v-for='comment in comments'>
					<span class="area headerImg">
					<img :src = 'comment.user.avatarUrl'  alt="" />
				</span>
					<div class="middle">
						<p class="name">{{comment.user.nickname}}</p>
						<p class="data">{{comment.time}}</p>
						<p class="comment">{{comment.content}}</p>
					</div>
					<span class="area evaluate">
					{{comment.likedCount}}
					<i class="iconfont icon-down"></i>
				</span>
					<p class="cutline"></p>
				</li>
			</ul>
		</div>

	</div>
</template>
<script type="text/javascript">
	import headTop from './commHeader/header.vue';
	import {
		getComments
	} from '../api/getData.js';
	import {
		mapGetters
	} from 'vuex';
	export default {
		data: function() {
			return {
				goBack: true,
				isTitle: false,
				cat: '',
				initloading: false,
				offset: 0,
				songlist: [],
				preventRepeatReuqest: false,
				loading: false,
				loadingText: '正在加载..',
				comments: [],
				total: 0,
			}
		},
		components: {
			headTop
		},
		beforeRouteEnter: function(to, from, next) {
			next(vm => {
				var id = vm.$route.params.id;
				vm.getComments(id);
			})
		},
		methods: {
			async getComments(id) {
				this.loading = true;
				var res = await getComments(id);
				this.comments = res.hotComments;
				this.total = res.total;
				this.loading = false;
			}
		},
		computed:{
			...mapGetters([
				'audio'
			])
		}
	}
</script>
<style scoped>
	img{
		height: 100%;
		width: 100%;
	}
	.mytitle {
		color: #fff;
		font-size: 2.0rem;
		margin-left: 4.5rem;
		position: absolute;
		top: 1.6rem;
	}
	
	.cutline {
		height: 1px;
		position: absolute;
		width: 98%;
		background: radial-gradient(#d3d3d3 -90%, transparent 100%);
		bottom: 0;
	}
	
	.commentsItem{
		padding: 5.4rem 0;
	}
	.toPlayDetail{
		padding: 1rem;
	}
	.toPlayDetail li{
		display: inline-block;
		line-height: 8rem;
		vertical-align: middle;
	}
	.toPlayDetail li.img{
		height: 8rem;
		width: 8rem;
	}
	.toPlayDetail li.info{
		width:21rem;
		padding-left: 0.6rem;
		font-size: 1.2rem;
		color: #ccc;
	}
	.toPlayDetail li.info .name{
		padding-bottom: 1.4rem;
		font-size: 1.5rem;
		color: #000;
		width:100%;
		overflow: hidden;
		word-break: keep-all;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.toPlayDetail li.toDetail i{
		color: #ccc;
		cursor: pointer;
	}
	.commentsTitle {
		padding: 1rem;
		background: rgb(225,227,226);
	}
	
	.commentslist li {
		position: relative;
		padding: 1rem 1.7rem;
	}
	
	.comments li .area {
		position: absolute;
		display: inline-block;
		top: 1.7rem;
	}
	
	.comments li .heardImg {
		left: 1.7rem;
		width: 3rem;
		height: 3rem;
	}
	
	.comments li .headerImg img {
		border-radius: 50%;
		width: 3rem;
		height: 3rem;
	}
	
	.comments li .middle {
		padding: 0 1.7rem 0 3.5rem;
	}
	
	.comments li .name {
		padding: 0.3rem;
		font-size: 1.2rem;
	}
	
	.comments li .data {
		font-size: 1.1rem;
		color: #ccc;
	}
	
	.comments li .comment {
		padding-top: 0.9rem;
		font-size: 1.4rem;
		color: #000;
		font-weight: 200;
	}
	
	.comments li .evaluate {
		right: 1.7rem;
	}
	
	.comments li .evaluate i {
		cursor: pointer;
		color: #ccc;
		font-size: 1.3rem;
	}
</style>