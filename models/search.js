import {Http} from "../utils/http";

class Search {
    static async getCategoryList() {
        return await Http.request2({
            url: `product/search`
        })
    }
}

export {
    Search
}