import { baseUrl } from '@/config/env'

export default async(url = '', parameters = {}, type = 'GET', method = 'fetch') => {
	type = type.toUpperCase();
	url = baseUrl + url;

	if (type == 'GET') {
		let paraStr = ''; //数据拼接字符串
		Object.keys(parameters).forEach(key => {
			paraStr += key + '=' + parameters[key] + '&';
		})

		if (paraStr !== '') {
			paraStr = paraStr.substr(0, paraStr.lastIndexOf('&'));
			url = url + '?' + paraStr;
			
		}
	}

	if (window.fetch && method == 'fetch') {
		let requestConfig = {
			credentials: 'include',
			method: type,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			mode: "cors",
			cache: "default"
		}

		if (type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(parameters)
			})
		}

		return fetch(url, requestConfig);
		// try {
		// 	const response = await fetch(url, requestConfig);
		// 	const responseJson = await response.json();
		// 	return responseJson
		// } catch (error) {
		// 	throw new Error(error)
		// }
	} else {
		return new Promise((resolve, reject) => {
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new window.ActiveXObject;
			}

			let sendData = '';
			if (type == 'POST') {
				sendData = JSON.stringify(parameters);
			}

			requestObj.open(type, url, true);
			requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			requestObj.send(sendData);

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						resolve(obj)
					} else {
						reject(requestObj)
					}
				}
			}
		})
	}
}