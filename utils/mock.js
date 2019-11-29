
class Mock {

	static getData(name) {
		var url = "../mock/" + name
		const request = new XMLHttpRequest();
		request.open("get", url);/*设置请求方法与路径*/
		request.send(null);/*不发送数据到服务器*/
		request.onload = function () {/*XHR对象获取到返回信息后执行*/
			if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
				let json = JSON.parse(request.responseText);
				for(let i=0;i<json.length;i++){
					console.log(json[i].name);
				}
				console.log(json);
			}
		}
		return json

	}


}