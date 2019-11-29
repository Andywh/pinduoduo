// components/spu-preview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  // observers: {
  //   data:function (data) {
  //     if (!data) {
  //       return
  //     }
  //
  //   }
  // }

  /**
   * 组件的方法列表
   */
  methods: {
    onImgLoad(event) {
      const { width, height } = event.detail
      this.setData({
        w: 360,
        h: 360 * height / width
      })
    },

  }
})
