import {Paging} from "../utils/paging";

class SpuPaging {
	static getLatestPaging() {
		return new Paging({
			url:`/api/alexa/goods/hub?`
		})
	}
}

export {
	SpuPaging
}
