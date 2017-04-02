import Vue from 'vue';
import App from './App';
import router from './router/router';
import store from './store';
import Mint from 'mint-ui';
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css';
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
	preLoad: 1.3,	
	error: './comm/img/default_cover.png',
	loading:require('./comm/img/default_cover.png') ,
	 attempt: 1
})
Vue.use(Mint);
Vue.use(MuseUI)
	/* eslint-disable no-new */
console.log(router, '.......')

new Vue({
	el: '#app',
	components: {
		App
	},
	watch: {
		'$route': function() {
			console.log('dddl', this.$router, this)
		}
	},
	template: '<App/>',
	router: router,
	store: store
		// template:App,
})