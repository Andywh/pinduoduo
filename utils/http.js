import {config} from "../config/config";
import {promisic} from "./util";

var app = getApp()


class Http {

    static async request({url, data, method='GET'}) {
        const res = await promisic(wx.request)({
            url:`${config.apiBaseUrl}${url}`,
            data,
            method,
            // header:{
            //     appkey: config.appkey
            // },
        })
        return res.data
    }

    static async request2({url, data, method='GET'}) {
        console.log("token", app.globalData.token)
        const res = await promisic(wx.request)({
            url:`${config.apiBaseIp}${url}`,
            data,
            method,
            header: {
                'content-type': 'application/x-www-form-urlencoded', // 默认值
                'token': app.globalData.token,
            },
            // header:{
            //     appkey: config.appkey
            // },
        })
        return res.data['data']
    }
}

export {
    Http
}