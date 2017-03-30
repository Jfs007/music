<template>
	<div>
		<mu-bottom-sheet :open="bottomSheet" @close="close ">
			<div class="topContrl">
				<div class="cutline"></div>
				<span class="playType" @click='changeType'>
					<i :class="['iconfont',playTypes[currentType]]"></i>
					{{playType}}
				</span>
				<span class="listNum">({{playList.length}})</span>
			</div>
			<ul class="listWrap">
				<li v-for='(song,index) in playList'
				    @click="play(index,song.id)">  			   
				    <p class="infoLeft"> 
				    	<i v-if = 'audio.id==song.id' class="index iconfont icon-laba"></i>
				    	<span class="songsInfo">{{song.name}}-<i class="singer">{{song.singer}}</i></span>
				    </p>				   
				   <span class="remove" @click.stop="remove(index)"><i class="iconfont icon-x"></i></span>
				   <p class="cutline"></p>
				</li>
			</ul>

		</mu-bottom-sheet>
	</div>
</template>
<script type="text/javascript">
	import {
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex';
	import {
		getStore
	} from '../../localStore/store.js';
	export default {
		data: function() {
			return {
				bottomSheet: false,
				title: '12232',
				currentType:0,
				playTypes:['icon-liebiaoxunhuan','icon-danquxunhuan'],
				playTypesName:['列表循环','单曲循环']
			}
		},
		mounted:function(){
			var item = getStore('playList');
			item.length>0&&this.replacePlayList(item);
		},
		computed: {
			...mapGetters([
				'playList',
				'currentIndex',
				'audio',
				'playType'
			])
		},
		methods: {
			...mapMutations([
				'setIndex',
				'changeSong',
				'removePlay',
				'setPlayType',
				'replacePlayList'
			]),
			...mapActions([
				'getSong'
			]),
			changeType:function(){
				var length = this.playTypes.length;
				this.currentType++;
				this.currentType = this.currentType%length;
				this.setPlayType(this.playTypesName[this.currentType]);
			},
			play: function(index,id) {
				this.setIndex(index + 1);
				this.getSong(id);
			},
			show: function() {
				this.bottomSheet = true;
			},
			close: function() {
				this.bottomSheet = false;
			},
			remove:function(index) {
				this.removePlay(index)
			}
		},
		watch:{
			'$route':function(to,from){
				this.bottomSheet = false;
			}
		}
	}
</script>
<style type="text/css">
	.cutline{
		height: 1px ;
		position: absolute;
		width:98%;
		background: radial-gradient(#d3d3d3 -90%, transparent 100%);
		bottom: 0;
	}	
	.topContrl {
		position: relative;
		padding: 1.6rem;
		cursor: pointer;
	}
	
	.listWrap {
		max-height: 35rem;
		width: 100%;
		box-sizing: border-box;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
		padding-bottom: 1.2rem;
	}
	.listWrap li{
		position: relative;
		padding: 1.6rem;
		font-size: 1.6rem;	
		line-height: 1.7rem;
		cursor: pointer;
	}
	.listWrap li .infoLeft{
		word-break: keep-all;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		padding-right: 4rem;
	}
	.infoLeft .songsInfo{
		padding-top: 0.1rem;
	}
	.listWrap .singer{
		font-size: 1.2rem;
		line-height: 1.6rem;
		color: #ccc;
	}
	.listWrap li .remove{
		position: absolute;
		right: 1.2rem;
		top:1.6rem;
		cursor: pointer;
	}
	.currentPlay {
		color: #008000;
	}
</style>