import {Http} from "./http";

class Paging {

	size
	page
	req
	locker = false
	url
	accumulator = []

	constructor(req, size = 20, page = 1) {
		this.size = size
		this.page = page
		this.req = req
		this.url = req.url
	}

	async getMoreData() {
		if (!this._getLocker()) {
			return
		}
		const data = await this._actualGetData()
		this._releaseLocker()
		return data
	}

	async _actualGetData() {
		const req = this._getCurrentReq()
		let paging = await Http.request(req)
		if (!paging) {
			return null
		}
		if (paging.total_size === 0) {
			return {
				empaty: true,
				items: [],
				accumulator: []
			}
		}

		this.page += 1

		this._accumulate(paging.goods_list)
		return {
			empty: false,
			items: paging.goods_list,
			accumulator: []
		}

	}

	_accumulate(items) {
		this.accumulator = this.accumulator.concat(items)
	}


	_getCurrentReq() {
		let url = this.url
		const params = `list_update_time=true&platform=1&assist_allowed=1&page=${this.page}&size=${this.size}`
		// url = v1/spu/latest + '?' + params
		// url = v1/spu/latest?other=abc+'&'+params
		if (url.includes('?')) {
			url += '&' + params
		} else {
			url += '?' + params
		}
		this.req.url = url
		return this.req
	}

	_getLocker() {
		if (this.locker) {
			return false
		}
		this.locker = true
		return true
	}

	_releaseLocker() {
		this.locker = false
	}

}

export {
	Paging
}