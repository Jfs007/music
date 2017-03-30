import {
	getListDetail,
	getSong
} from '../api/getData.js';
const actions = {
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
	}
export default actions;
