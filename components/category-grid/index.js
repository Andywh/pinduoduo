// components/category-grid/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    grid: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    viewleft: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    scrollMove: function (e) {
      //获取滚动距离
      var left = e.detail.scrollLeft*80/331;
      //将滚动距离（位移）动态添给滚动条的left
      this.setData({
        viewleft: left
      })

    }
  }
})
