// pages/search/search.js
import {Search} from "../../models/search";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        categoryList: {}
    },

    async onLoad(options) {
        const searchCategoryData = await Search.getCategoryList();
        // console.log(searchCategoryData)
        this.setData({
            categoryList: searchCategoryData
        })
    }


})