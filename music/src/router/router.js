import Index from '../components/index';
import Home from '../components/home';
import App from '../App';
//import Like from '';
//import Home from '../components/home';
import Vue from 'vue';
import VueRouter from 'vue-router';
const album = function(r) {
	require(['../components/search/album'], r)
};
const mv = function(r) {
	require(['../components/search/mv'], r)
};
const radio = function(r) {
	require(['../components/search/radio'], r)
};
const singer = function(r) {
	require(['../components/search/singer'], r)
};
const singleSong = function(r) {
	require(['../components/search/singleSong'], r)
};
const user = function(r) {
	require(['../components/search/user'], r)
};
const songSheet = function(r) {
	require(['../components/search/songSheet'], r)
};
Vue.use(VueRouter)
var router = new VueRouter({
	routes: [{
			path: '/',
			redirect: '/index'
		}, {
			path: '/index',
			component: function(r) {
				require(['../components/index'], r)
			},
			children: [{
				path: '/index',
				redirect: '/index/recommend'
			}, {
				path: '/index/home',
				component: Home
			}, {
				name: 'playListDisplay',
				path: '/index/playListDisplay',
				component: function(r) {
					require(['../components/playListDisplay'], r)
				}
			}, 
			{
				path:'/index/recommend',
				component:function(r){
					require(['../components/recommend'],r)
				}
			},
			{
				path: '/index/like',
				component: function(r) {
					require(['../components/like'], r)
				}
			}]
		}, {
			name: 'playDetail',
			path: '/playDetail/:id',
			component: function(r) {
				require(['../components/playDetail'], r)
			}
		}, {
			name: 'listDetail',
			path: '/listDetail/:id',
			component: function(r) {
				require(['../components/listDetail'], r)
			}
		},
		// primeSong列表
		{
			name: 'primeSong',
			path: '/primeSong',
			component: function(r) {
				require(['../components/primeSong'], r)
			}
		}, {
			name: 'search',
			path: '/search',
			component: function(r) {
				require(['../components/search'], r)
			},
			children: [{
				path: '/search/album',
				component: album
			}, {
				path: '/search/mv',
				component: mv
			}, {
				path: '/search/songSheet',
				component: songSheet
			}, {
				path: '/search/radio',
				component: radio
			}, {
				path: '/search/singer',
				component: singer
			}, {
				path: '/search/singleSong',
				component: singleSong
			}, {
				path: '/search/user',
				component: user
			}]
		}, 
		{
			name:'playMv',
			path:'/playMv',
			component:function(r) {
				require(['../components/playMv'],r)
			}
		},
		{
			name: 'comments',
			path: '/comments/:id',
			component: function(r) {
				require(['../components/comments'], r)
			}
		},
		// 详情页面
	]
});

export default router