import Vue from 'vue';
import Vuex from 'vuex';
import {
	getListDetail,
	getSong
} from '../api/getData.js';
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		audio: {
			id: 0,
			name: '歌曲名称',
			singer: '演唱者',
			albumPic: '',
			albumPicSmall: '/static/player-bar.png',
			location: '',
			album: ''
		},
		index: 0,
		playing: false,
		change: false,
		playList: [],
		currentTime: 0,
		skipTime: 0,
		durationTime: 0.1,
		bufferTime: 0,
		showDetail: true,
		loading: true,
		playType: '列表循环',
		history:['周传雄','薛之谦','hw']
	},
	// 修改state的内容
	mutations: {
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
		addSongList: function(state, args) {
			// args为对象可以传{audio:audio,type:1/2}
			var flag = true;
			//type 1 表示添加并且播放就绪，2表示添加歌单
			var type = args.type || 1;
			var audio = args.audio;
			//			state.playList.forEach(function(song,index){
			//				if(song.id === audio.id){
			//					state.index = index+1;
			//					flag = false;
			//				}
			//			})
			//			if(flag&&state.playList.push(audio)){
			//				state.index = state.playList.length;
			//			}
			//			if(type===2){
			//				state.index--;
			//			}
			//			
			// 
			//如果加入的就是当前的,直接跳过
			if(state.audio.id === audio.id){
				return;
			}
			state.playList.forEach(function(song, index) {
				if(song.id === audio.id) {
					if(type === 2) {
						var tempAudio = state.playList[index];
						//console.log(tempAudio.name,'1')
						var waitAudio = state.playList.splice(index, 1);
						state.playList.splice(state.index, 0, tempAudio);
						//console.log(waitAudio.name,state.playList[state.index].name,'waitAudio')
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

	},
	actions: {
		async prevPlay({
			commit,
			state,
			dispatch
		}) {
			commit('openLoad');
			state.index--;
			if(state.index < 1) {
				state.index = state.playList.length;
			}
			await dispatch('getSong')
		},
		async nextPlay({
			commit,
			state,
			dispatch
		}) {
			commit('openLoad');
			state.index++;
			if(state.index > state.playList.length) {
				state.index = 1;
			}
			await dispatch('getSong')
		},
		async getSong({
			commit,
			state
		}, id) {
			var id = id || state.playList[state.index - 1].id;
			if(state.playList[state.index - 1].location) {
				commit('changeSong')
			} else {
				commit('changeSong');
				state.location = '';
				var url = await getSong(id);
				var location = url.data[0].url;
				commit('setUrl', location);
			}
			state.loading = false;
		}
	},
	getters: {
		history:function(state){
			return state.history;	
		},
		playType: function(state) {
			return state.playType;
		},
		showDetail: function(state) {
			return state.showDetail;
		},
		audio: function(state) {
			return state.audio;
		},
		posCurrTime: function(state) {
			return state.currentTime / state.durationTime
		},
		posBufferTime: function(state) {
			return state.bufferTime / state.durationTime
		},
		playList: function(state) {
			return state.playList
		},
		isPlay: function(state) {
			return state.playing
		},
		currentIndex: function(state) {
			return state.index
		},
		isChange: function(state) {
			return state.change
		},
		currTime: function(state) {
			return state.currentTime
		},
		durationTime: function(state) {
			return state.durationTime
		},
		loading: function(state) {
				return state.loading
			}
			// 获得state的内容
	}
});
export default store;