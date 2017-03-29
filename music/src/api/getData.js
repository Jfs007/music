import fecth from './fecth';
var api = 'https://route.showapi.com/213-4?showapi_appid=31967';
var america = function() {
	return fecth('GET', api, {
		showapi_timestamp: '',
		topid: 26,
		showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',
	})
}
var hinterland = function() {
	return fecth('GET', api, {
		showapi_timestamp: '',
		topid: 5,
		showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',

	})
}
var getAlbums = function(id) {
	return fecth('GET', api, {
		showapi_timestamp: '',
		topid: id,
		showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',

	})
}
const baseUrl = 'http://musicapi.duapp.com/api.php'
const baseUrl2 = 'https://api.imjad.cn/cloudmusic/'
	//三种类型歌单 欧美 粤语 华语
var getSongList = function(cat, offset, limit) {
	return fecth('GET', baseUrl, {
		type: "topPlayList",
		cat: cat,
		offset: offset,
		limit: limit
	})
}
var getListDetail = function(id) {
	return fecth('GET', baseUrl2, {
		type: "playlist",
		id: id
	})
}
// 'playlist' , 'ablum' ,'mv'
var getDataList = function(type,id) {
	return fecth('GET',baseUrl2, {
		type:type,
		id:id
	})
}
var getSong = function(id) {
	return fecth('GET', baseUrl, {
		type: 'url',
		id: id
	})
}
var getLrc = function(id) {
	return fecth('GET', baseUrl2, {
		type: 'lyric',
		id: id
	})
}
var search = function(s, sType, limit, offset) {
	//https://api.imjad.cn/cloudmusic/?type=search&s=s&search_type%20=1&limit=3
	return fecth('GET', baseUrl2, {
		type: 'search',
		//关键词，你懂的
		s: s,
		/* 1 单曲
		  10 专辑 
		  100 歌手
		  1000 歌单
		  1002 用户
		  1004 mv
		  1006 歌词
		  1009 主播电台 */
		search_type: sType,
		//查找条数
		limit: limit,
		//分页，从第几条开始查找
		offset: offset
	})
}
var getComments = function(id) {
		return fecth('GET', baseUrl2, {
			type: 'comments',
			id: id
		})
	}
	//export default {
	//getPlayListByWhere (cat, order, offset, total, limit) {
	//  return _baseUrl + '?type=topPlayList&cat=' + cat + '&offset=' + offset + '&limit=' + limit
	//},
	//getLrc (id) {
	//  return _baseUrl2 + '?type=lyric&id=' + id
	//},
	//getSong (id) {
	//  return _baseUrl + '?type=url&id=' + id
	//},
	//getPlayListDetail (id) {
	//  return _baseUrl2 + '?type=playlist&id=' + id
	//},
	//getMv (id) {
	//  return _baseUrl2 + '?type=mv&id=' + id
	//},
	//search (words) {
	//  return _baseUrl2 + '?type=search&s=' + words
	//}
	//}
	//export default {
	//	america: {
	//		url: 'https://route.showapi.com/213-4?showapi_appid=31967',
	//		params: (id) => {
	//			return {
	//				showapi_timestamp: null,
	//				topid: 3,
	//				showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',
	//			}
	//		},
	//	},
	//	hinterland: {
	//		url: 'https://route.showapi.com/213-4?showapi_appid=31967',
	//		params: (id) => {
	//			return {
	//				showapi_timestamp: null,
	//				topid: 5,
	//				showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',
	//			}
	//		},
	//	},
	//	hongkong: {
	//		url: 'https://route.showapi.com/213-4?showapi_appid=31967',
	//		params: (id) => {
	//			return {
	//				showapi_timestamp: null,
	//				topid: 6,
	//				showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',
	//			}
	//		},
	//	},
	//	korea: {
	//		url: 'https://route.showapi.com/213-4?showapi_appid=31967',
	//		params: (id) => {
	//			return {
	//				showapi_timestamp: null,
	//				topid: 16,
	//				showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',
	//			}
	//		},
	//	},
	//	jp: {
	//		url: 'https://route.showapi.com/213-4?showapi_appid=31967',
	//		params: (id) => {
	//			return {
	//				showapi_timestamp: null,
	//				topid: 17,
	//				showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',
	//			}
	//		},
	//	},
	//	ballad: {
	//		url: 'https://route.showapi.com/213-4?showapi_appid=31967',
	//		params: (id) => {
	//			return {
	//				showapi_timestamp: null,
	//				topid: 18,
	//				showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',
	//			}
	//		},
	//	},
	//	rock: {
	//		url: 'https://route.showapi.com/213-4?showapi_appid=31967',
	//		params: (id) => {
	//			return {
	//				showapi_timestamp: null,
	//				topid: 19,
	//				showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',
	//			}
	//		},
	//	},
	//	sales: {
	//		url: 'https://route.showapi.com/213-4?showapi_appid=31967',
	//		params: (id) => {
	//			return {
	//				showapi_timestamp: null,
	//				topid: 23,
	//				showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',
	//			}
	//		},
	//	},
	//	hot: {
	//		url: 'https://route.showapi.com/213-4?showapi_appid=31967',
	//		params: (id) => {
	//			return {
	//				showapi_timestamp: null,
	//				topid: 26,
	//				showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',
	//			}
	//		},
	//	},
	//
	//}
export {
	america,
	hinterland,
	getAlbums,
	getSongList,
	getListDetail,
	getSong,
	getLrc,
	search,
	getComments,
	getDataList
}