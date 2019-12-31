import {Http} from "../utils/http";


class User {

    static async login(code) {
        console.log(`user/login/`+code)
        return await Http.request2({
            url: `user/login/`+code
        })
    }

    static async update(data) {
        console.log(`user/update`)
        return await Http.request2({
            url: `user/update`,
            data: data,
            method: 'POST'
        })
    }

}


export {
    User
}