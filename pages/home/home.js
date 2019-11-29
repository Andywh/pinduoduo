import {Banner} from "../../models/banner";
import {Category} from "../../models/category";
import {SpuPaging} from "../../models/spu-paging";

Page({

	data: {
		bannerA: null,
		grid: null,
		paging: null,
		spuPaging: null,
		loadingType: 'loading'
	},

	async onLoad(options) {
		console.log("begin")
		const bannerA = await Banner.getHomeLocationA()
		const grid = Category.getGridCategory()
		this.setData({
			bannerA,
			grid
		})
		this.initBottomSpuList()
	},

	async initBottomSpuList() {
		const paging = await SpuPaging.getLatestPaging()
		console.log(paging)
		this.data.spuPaging = paging
		const data = await paging.getMoreData()
		if (!data) {
			return
		}
		console.log('data', data.items)
		// 累加
		wx.lin.renderWaterFlow(data.items)
	},


	onPullDownRefresh: function () {

	},

	onReachBottom: async function () {
		console.log("reach bottom")
		const data = await this.data.spuPaging.getMoreData()
		console.log("data.spuPaging", this.data.spuPaging)
		console.log("new data", data)
		if (!data) {
			return
		}
		wx.lin.renderWaterFlow(data.items)

		// if (!data.moreData) {
		// 	this.setData({
		// 		loadingType:'end'
		// 	})
		// }

	},

	onShareAppMessage: function () {

	}
})