<template>
	<div class="header_bar">
		<slot name="leftOption">
			
		</slot>
		<span class="head_goBack" v-if='goBack' @click='$router.go(-1)'><i class="iconfont icon-fanhui"></i></span>
		<span class="head_title" v-if='isTitle'>
			<i class="iconfont icon-iconfontbiaozhunmoban01"></i>
			{{headTitle}}
		</span>
		<slot name="title"></slot>
		<slot name="search"></slot>
		<span class="searchBtn" v-if='isSearch' @click='toSearch' >
			<i class="iconfont icon-seach"></i>
		</span>
	</div>
</template>
<script type="text/javascript">
	export default {
		props:{
			headTitle:{
				type:String,
				default:'音乐 热爱你我'
			},
			goBack:{
				type:Boolean,
				default:true
			},
			isTitle:{
				type:Boolean,
				default:true
			},
			isSearch:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			toSearch:function(){
				this.$router.push({name:'search'})
			}
		},
		watch:{
			'$route':function(){
			}
		},
		created:function(){
		}
	}
</script>
<style type="text/css" scoped>
	.header_bar{
		height: 5.5rem;
		width:100%;
		background: rgb(69,168,120);
		position: fixed;
		top:0;
		z-index: 90;
	}
	.head_goBack{
		cursor: pointer;
		position: absolute;	
		left:1rem;
		display: block;
		color:#fff;
		width:0.5rem;
		margin-top: 1.0rem;
	}
	.head_goBack i{
		font-size: 2.5rem;
	}
	.head_title{
		position: absolute;
		left: 50%;
		top: 50%;
		width:50%;
		transform: translate(-50%, -50%);
		text-align: center;
		font-size: 1.8rem;
		color: #fff;
		font-weight: 200;
	}
	.searchBtn{
		cursor: pointer;
		position: absolute;
		top:1.6rem;
		right: 3rem;
		width:.6rem;
	}
	.searchBtn i{
		font-size: 2.5rem;
		color: #fff;
	}
</style>