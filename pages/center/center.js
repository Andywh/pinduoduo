// pages/center/center.js
import {Orange} from "../../models/orange";
import {SpuPaging} from "../../models/spu-paging";
import {User} from "../../models/user";

const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        grid: null,
        paging: null,
        spuPaging: null,
        loadingType: 'loading',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },

    async onLoad(options) {
        const grid = Orange.getGridOrange()
        this.setData({
            grid
        })

        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
        this.initBottomSpuList()
    },
    async getUserInfo(e) {
        console.log("getUserInfo")
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
        const userInfo = e.detail.userInfo
        // userInfo['openid']
        console.log('userInfo', userInfo)
        const updateResponse = User.update(userInfo);
        console.log("updateResponse: ", updateResponse)
    },


    async initBottomSpuList() {
        const paging = await SpuPaging.getLatestPaging()
        this.data.spuPaging = paging
        const data = await paging.getMoreData()
        if (!data) {
            return
        }
        console.log('data', data.items)
        // 累加
        wx.lin.renderWaterFlow(data.items)
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
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})