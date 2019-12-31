import {Banner} from "../../models/banner";
import {Category} from "../../models/category";
import {SpuPaging} from "../../models/spu-paging";
import {HomeCategory} from "../../models/home-category";
import {User} from "../../models/user";

var app = getApp()

Page({

	data: {
		bannerA: null,
		grid: null,
		paging: null,
		spuPaging: null,
		loadingType: 'loading',
		topCategoryMap: {},
		topCategory: null,
        topCategoryId: null,
		currentIndex: 0,
		leftScroll: 0,
		itemWidth: 52,
		activeColor: '#E02E24',
		inactiveColor: '#666666'
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
		this.initTopScrollBar()
		const topCategory = await HomeCategory.getSonCategoryList(0)
		topCategory.unshift({
			'optId': 0,
			'optName': '热门'
		})
		this.setData({
			topCategory
		})
		// console.log(this.data)
		wx.login({
			async success(res) {
				console.log('res', res)
				let code = res['code']
				const loginResponse = await User.login(code)
				console.log("response", loginResponse)
				app.globalData.token = loginResponse
			}
		})
	},

	async initBottomSpuList() {
		const paging = await SpuPaging.getLatestPaging()
		// console.log(paging)
		this.data.spuPaging = paging
		const data = await paging.getMoreData()
		if (!data) {
			return
		}
		// console.log('data', data.items)
		// 累加
		wx.lin.renderWaterFlow(data.items)
	},

	initTopScrollBar() {
		let that = this
		wx.getSystemInfo({
			success(res) {
				that.setData({
					windowWidth: res.windowWidth
				})
			}
		})

		setTimeout(function () {
			that.createSelectorQuery().select('.tab-item').boundingClientRect(function (rect) { // select
			}).exec(function (res) {
				// console.log(res)
				that.setData({
					itemWidth: res[0].width
				})
			})
		}, 1000)
	},

	async handleChange(e) {
		const currentIndex = e.currentTarget.dataset.index
		const categoryId = e.currentTarget.dataset.categoryid
		const optName = e.currentTarget.dataset.optname
		const itemWidth = this.data.itemWidth
		const windowWidth = this.data.windowWidth
		let leftScroll = this.data.leftScroll
		if (currentIndex * itemWidth + itemWidth / 2 > windowWidth / 2) {
			leftScroll = currentIndex * itemWidth + itemWidth / 2 - windowWidth / 2
		} else {
			leftScroll = 0
		}
		const levelOneCategory = await this.getLevelOneCategory(categoryId)
		this.setData({
			currentIndex,
			leftScroll,
			levelOneCategory,
            topCategoryId: categoryId,
			topName:optName
		})
	},

	async getLevelOneCategory(categoryId) {
		let topCategoryMap = this.data.topCategoryMap
		console.log(topCategoryMap[categoryId])
		if (topCategoryMap[categoryId] != null) {
			return topCategoryMap[categoryId]
		}
		const levelOneCategory = await HomeCategory.getLevelOneCategoryList(categoryId)
		topCategoryMap[categoryId] = levelOneCategory
		return levelOneCategory
	},

	onPullDownRefresh: function () {

	},

	onReachBottom: async function () {
		const data = await this.data.spuPaging.getMoreData()
		if (!data) {
			return
		}
		wx.lin.renderWaterFlow(data.items)
	},

	onShareAppMessage: function () {

	}
})