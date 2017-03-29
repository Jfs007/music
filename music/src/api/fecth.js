/**只能使用于部分历览器**/
export default async(type, url, data) => {
	let requestConfig = {
		//credentials: 'include',
		method: type,
		headers: {
			//			'Accept': 'application/json',
			//			'Content-Type': 'application/json',
		},
		mode: "cors",
		//cache: "force-cache"
	}

	if(type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})

		if(dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			console.log(url)
			console.log(dataStr, 'dataStr')
			var temp = url.indexOf('?') > 0 ? "&" : "?";
			console.log(temp)
			url = url + temp + dataStr;
		}
	}

	console.log(url, '....')
	if(type == 'POST') {
		Object.defineProperty(requestConfig, 'body', {
			value: JSON.stringify(data)
		})
	}
	//兼容 
	if(window.fetch) {
		try {
			//alert('error')
			var response = await window.fetch(url, requestConfig);
			console.log(response, 'response///JSOn')
			var responseJson = await response.json();
			//alert('什么鬼'+responseJson)
			console.log(responseJson, 'responseJson')
		} catch(error) {
			alert('获取资源一不小心失败了，，大佬重试吧~嘤嘤嘤')
			throw new Error(error)
		}
		//console.log()
		return responseJson
	} else {
		//new Promise(function())
		var xhr;
		if(window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else {
			xhr = new ActiveXObject;
		}
		var sendData = '';
		if(type == 'POST') {
			sendData = JSON.stringify(data);
		}
		xhr.open(type, url, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(sendData);
		// z
		return new Promise(function(resolve, reject) {
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4) {
					if(xhr.status == 200) {
						var obj = xhr.response
						if(typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						//alert(JSON.stringify(obj))
						resolve(obj)
					} else {
						alert('获取资源一不小心失败了，，大佬重试吧~嘤嘤嘤')
						throw new Error(xhr)
					}
				}
			}
		})
	}
}