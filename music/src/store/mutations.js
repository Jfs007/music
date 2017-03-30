import {
	getListDetail,
	getSong
} from '../api/getData.js';
import { setStore } from '../localStore/store.js' ;
const mutations = {
		removePlay: function(state, index) {
			if(state.audio.id === state.playList[index].id){
				return false;
			}
			state.playList.splice(index,1);
			if(index<state.index-1){
				state.index--;
			}
			return true;
		},
		removeHistory:function(state,index){
			state.history.splice(index,1)	
		},
		addHistory:function(state,hy){
			var history = state.history;
			history.forEach(function(h,index){
				if(hy === h){
					state.history.splice(index,1);
				}
			})
			state.history.unshift(hy);
		},
		emptyList:function(state){
			state.playList = [];
		},
		setUrl: function(state, url) {
			state.audio.location = url
		},
		setPlayType: function(state, type) {
			state.playType = type;
		},
		setAudio: function(state, bar) {
			state.audio = bar;
		},
		setLoading: function(state, flag) {
			state.loading = flag;
		},
		setShowDetail: function(state, flag) {
			state.showDetail = flag;
		},
		play: function(state) {
			state.playing = true
		},
		pause: function(state) {
			state.playing = false
		},
		prevPlay: function(state) {
			state.index--;
			if(state.index < 1) {
				state.index = state.playList.length;
			}
			state.audio = state.playList[state.index - 1];
		},
		nextPlay: function(state) {
			state.index++;
			if(state.index > state.playList.length) {
				state.index = 1;
			}
			state.audio = state.playList[state.index - 1];
		},
		setChange: function(state, flag) {
			state.change = flag
		},
		setCurrTime: function(state, time) {
			state.currentTime = time;
		},
		setDurationTime: function(state, dTime) {
			state.durationTime = dTime
		},
		setPosCurrTime: function(state, val) {
			state.posCurrTime = 0;
		},
		setBufferTime: function(state, time) {
			state.bufferTime = time
		},
		//直接把所有的playlist的值替换
		replacePlayList:function(state,list) {
			state.playList	= list;
		},
		addSongList: function(state, args) {
			// args为对象可以传{audio:audio,type:1/2}
			var flag = true;
			//type 1 表示添加并且播放就绪，2表示添加歌单
			var type = args.type || 1;
			var audio = args.audio;
			//如果加入的就是当前的,直接跳过
			if(state.audio.id === audio.id){
				return;
			}
			state.playList.forEach(function(song, index) {
				if(song.id === audio.id) {
					if(type === 2) {
						var tempAudio = state.playList[index];
						var waitAudio = state.playList.splice(index, 1);
						state.playList.splice(state.index, 0, tempAudio);
					} else {
						state.index = index + 1;
					}
					flag = false;
				}
			})
			if(flag) {
				if(type === 2) {
					state.playList.splice(state.index, 0, audio);
					console.log(audio,state.playList)
				} else {
					state.playList.push(audio);
					state.index = state.playList.length;
				}
			}
			setStore('playList',state.playList)
		},
		setIndex: function(state, index) {
			state.index = index;
		},
		// 切换歌曲 
		changeSong: function(state) {
			//alert('qie')
			console.log(state.playList, state.index, state.playList[0])
			state.audio = state.playList[state.index - 1]
		},

		setBufferTime: function(state, buffer) {
			state.bufferTime = buffer;
		},
		openLoad: function(state) {
			state.loading = true;
			state.playing = false;
			state.currentTime = 0;
			state.bufferTime = 0;
			state.durationTime = 0;
		}

	}
 export default mutations;