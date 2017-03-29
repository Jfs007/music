import Vue from 'vue';
import App from './App';
import router from './router/router';
import store from './store';
import Mint from 'mint-ui';
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css';
Vue.use(Mint);
Vue.use(MuseUI)
/* eslint-disable no-new */
console.log(router,'.......')

new Vue({
	el: '#app',
	components: {
		App
	},
	watch: {
			'$route': function(){
				console.log('dddl',this.$router,this)
			}
		},
	template: '<App/>',
	router: router,
	store:store
	// template:App,
})