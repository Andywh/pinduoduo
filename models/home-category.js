import {Http} from "../utils/http";

class HomeCategory {
    static async getSonCategoryList(categoryId) {
        return await Http.request2({
            url: `product/query/`+categoryId
        })
    }

    static async getLevelOneCategoryList(categoryId) {
        console.log(`product/query_home/`+categoryId)
        return await Http.request2({
            url: `product/query_home/`+categoryId
        })
    }



}


export {
    HomeCategory
}