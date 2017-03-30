var setStore = function(key,value){
	if(typeof value === 'object'){
		value = JSON.stringify(value);
	}
	window.localStorage.setItem(key,value)
}
var getStore = function(key){
	var item = window.localStorage.getItem(key)||[];
	return JSON.parse(item);
}
export {
	setStore,
	getStore
}
