<template>
	<div class="searchPage">
		<head-top :isTitle='isTitle'>
			<div slot="search" class="search">
					<input type="text" 
						 placeholder="搜索音乐、歌手、歌词、用户"
						 v-model="key"
						 v-on:keyup.13="submits"
						 />		
			</div>
		</head-top>
		<search-item v-if='search' :keys ='key'></search-item>
		<div class="searchMain" v-if='!search'>
			<h1 class="singerType">
				<i class="iconfont icon-geshou"></i>
				<span>歌手分类</span>
				<i class="iconfont icon-sanjiao"></i>
				<p class="cutline"></p>
			</h1>
			<ul class="history">
				<li v-for ='hy in history' @click = 'submits(hy)'>
					<i class="iconfont icon-lishi"></i>
					<span class="text">{{hy}}</span>
					<p class="cutline"></p>
					<span class="remove" @click.stop='removeHistory'><i class="iconfont icon-x"></i></span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/javascript">
	import searchItem from './search/searchItem.vue';
	import headTop from './commHeader/header.vue';
	import {
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex';
	import { search } from '../api/getData.js';
	export default {
		data:function(){
			return {
				isTitle:false,
				search:false,
				key:'',
			}
		},
		beforeRouteLeave:function(to,from,next){
			this.search = false;
			next();
		},
		methods:{
			...mapMutations([
				'removeHistory',
				'addHistory'
			]),
			submits:function(value){			
				var keys= typeof value === 'string'?value:this.key;
				this.addHistory(keys);	
				//alert(this.keys)
				this.$router.replace({path:'/search/singleSong',query:{key:keys}});
				this.search = true;
			}
		},
		computed:{
			...mapGetters([
				'history'
			])
		},
		watch:{
			'$route':function(to,from){
				
			}
		},
		components:{
			headTop,
			searchItem
		}
	}
</script>
<style type="text/css" scoped>
	input::-moz-placeholder{
		color: #CCCCCC;
	}
	input::-webkit-input-placeholder{
		color: #CCCCCC;
	}
	.cutline {
		height: 1px;
		position: absolute;
		width: 98%;
		background: radial-gradient(#d3d3d3 -90%, transparent 100%);
		bottom: 0;
	}
	.searchPage{}
	.search{
		height: 4.5rem;
		padding-top: 1.5rem;
		padding-left: 5rem;
		padding-right: 1rem;
	}
	.search input{
		width:100%;
		border: none;
		font-size: 1.8rem;
		padding-bottom: 0.7rem;
		background: none;
		border-bottom: 1px solid #ccc;
		color: #CCCCCC;
		line-height: 100%;
	}
	.searchMain{
		padding-top: 5.5rem;
	}
	.searchMain .singerType{
		font-size: 1.3rem;
		position: relative;
		padding: 1.4rem 0;
		text-align: center;
		margin: 0;
	}
	.searchMain .singerType span{
		padding: 0 0.7rem;
	}
	.searchMain .history{
		margin-top: 2rem;
	}
	.searchMain .history li{
		padding: 1.3rem 1.4rem;
		position: relative;
	}
	.searchMain .history li .text{
		padding: 0 1rem;
	}
	.searchMain .history li .remove{
		position: absolute;
		right: 2rem;
		top:1.3rem;
		cursor: pointer;
	}
</style>