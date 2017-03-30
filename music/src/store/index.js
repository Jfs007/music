import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import getters from './getters';
import actions from './actions';
import state from './state';
Vue.use(Vuex)
const store = new Vuex.Store({
	state: state,
	// 修改state的内容
	mutations: mutations,
	actions: actions,
	getters:getters
});
export default store;