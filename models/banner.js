import {Http} from "../utils/http";

class Banner {
	static locationA = 'b-1'
	// static async getHomeLocationA() {
	// 	return await Http.request({
	// 		url: `banner/name/${Banner.locationA}`
	// 	})
	// }
	// static name = 'banner.json'
	static getHomeLocationA() {
		// return Mock.getData(name)
		return {
			"id": 1,
			"name": "b-1",
			"description": "首页顶部主banner",
			"img": null,
			"title": null,
			"items": [{
				"id": 12,
				"img": "http://t00img.yangkeduo.com/goods/images/2019-08-30/816c406d-9431-4c6f-bb84-fd8b7295aa24.png?",
				"keyword": "t-2",
				"type": 3,
				"name": null,
				"banner_id": 1
			}, {
				"id": 13,
				"img": "http://t16img.yangkeduo.com/pdd_oms/2019-10-10/607731f0ab0222c94c2cc197b6af0867.png?",
				"keyword": "23",
				"type": 1,
				"name": null,
				"banner_id": 1
			}, {
				"id": 14,
				"img": "http://t00img.yangkeduo.com/goods/images/2019-10-29/48f0006c-aedb-4752-a9af-82e76578a842.jpg?",
				"keyword": "24",
				"type": 1,
				"name": null,
				"banner_id": 1
			}, {
				"id": 15,
				"img": "http://t16img.yangkeduo.com/phone_adx/22ae0124d97048c3a341b8fb723e1cf9.jpg?",
				"keyword": "25",
				"type": 1,
				"name": null,
				"banner_id": 1
			}]
		}
	}
}

export {
	Banner
}