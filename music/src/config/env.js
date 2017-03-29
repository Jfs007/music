let baseUrl; 
let routerMode;
const imgBaseUrl = '';

if (process.env.NODE_ENV == 'development') {
	baseUrl = '';
	routerMode = 'hash'
}else{
	baseUrl = 'https://mainsite-restapi.ele.me';
	routerMode = 'hash'
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl
}