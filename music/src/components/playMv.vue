<template>
	<div class="playMv">
		<video width="800" height="300" autoplay="autoplay" controls="controls">
			<source type="video/mp4" src='http://113.215.16.32/v4.music.126.net/20170328234611/c8835321dc8e5024751f045bd44e0af8/web/cloudmusic/ZSEiICYiYCIwICRkYCAwIA==/mv/==/14004/20140428181721/2438716790443921_1080.mp4?wshc_tag=0&wsts_tag=58d9dd87&wsid_tag=71d6d2db&wsiphost=ipdbm' />
			<source :src="urls['240']" type="video/ogg" />
			<source :src="urls['240']" type="video/webm" />
			
			<!--<object width="" height="" type="application/x-shockwave-flash" data="myvideo.swf">
				<param name="movie" value="myvideo.swf" />
				<param name="flashvars" value="autostart=true&amp;file=myvideo.swf" />
			</object>-->
			当前浏览器不支持 video直接播放，点击这里下载视频： <a href="myvideo.webm">下载视频</a>
		</video>
	</div>
</template>
<script type="text/javascript">
	import { getDataList } from '../api/getData.js';
	export default {
		data:function(){
			return {
				id:0,
				name:0,
				urls:{},
				playCount:0
			}
		},
		beforeRouteEnter:function(to,from,next){
			next(vm=>{
				vm.getUrl(vm.$route.query.id)
			})
		},
		methods:{
			async getUrl(id){
				var res = await getDataList('mv',id);
				this.urls = res.data.brs;
				this.playCount = res.data.playCount;
			}
		}
	}
</script>
<style>
	
</style>