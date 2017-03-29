<template>
	<div class="searchItem offsetTop">
		<ul class="list">
			<li>
				<router-link :to="{path: '/search/singleSong',query: { key: keys}}" replace>单曲</router-link>
			</li>
			<li>
				<router-link :to="{path: '/search/singer',query: { key: keys}}" replace>歌手</router-link>
			</li>
			<li>
				<router-link :to="{path: '/search/album',query: { key:keys}}" replace>专辑</router-link>
			</li>
		</ul>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>	
	</div>
</template>
<script type="text/javascript">
	import {
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex';
	export default {
		data: function() {
			return {

			}
		},
		mounted:function(){
		},
		props:['keys'],
		computed: {
			...mapGetters([
				'history',
				'searchKey'
			]),
		}
	}
</script>
<style type="text/css" scoped>
	.searchItem {
		padding-bottom: 5.5rem;
	}
	
	.offsetTop {
		padding-top: 5.5rem;
	}
	
	.list {
		display: flex;
	}
	
	.list li {
		flex: 1;
		padding: 1rem 3rem;
	}
	
	.list li a {
		display: block;
		text-align: center;
		color: #000000;
	}
</style>