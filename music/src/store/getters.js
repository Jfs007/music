const getters = {
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
export default getters;