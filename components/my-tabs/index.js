Component({
    externalClasses: [
        'l-class-tabs',
        'l-class-header',
        'l-class-active',
        'l-class-content',
        'l-class-inactive',
        'l-class-line',
        'l-class-tabimage',
        'l-class-header-line',
        'l-class-icon',
        'l-tabs-class',
        'l-header-class',
        'l-active-class',
        'l-content-class',
        'l-inactive-class',
        'l-line-class',
        'l-tabimage-class',
        'l-header-line-class',
        'l-icon-class'
    ],
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
        placement: {
            type: String,
            value: 'top',
        },
        animated: Boolean,
        hasLine: {
            type: Boolean,
            value: true
        },
        animatedForLine: Boolean,
        activeColor: {
            type: String,
            value: '#E02E24'
        },
        inactiveColor: {
            type: String,
            value: '#bbbbbb'
        },
        equalWidth: {
            type: Boolean,
            value: true
        },
        categoryList: {
            type: Object,
            value: null
        }
    },

    data: {
        tabList: [],
        currentIndex: 0,
        transformX: 0,
        transformY: 0,
        oneShow: true,
        leftTop: 0,
    },

    ready() {
        // console.log('this.data.categoryList', this.data.categoryList)
        var that = this
        var h = 0
        var heightArr = []
        setTimeout(function () {
            that.createSelectorQuery().select('.l-tabs-item').boundingClientRect(function (rect) { // select
            }).exec(function (res) {
                that.setData({
                    left_item_height: res[0].height
                })
            })
        }, 1000)

        setTimeout(function () {
            that.createSelectorQuery().selectAll('.right-view-item').boundingClientRect(function (rect) {
            }).exec(function (res) {
                res[0].forEach((item) => {
                    h += item.height
                    heightArr.push(h)
                })
                that.setData({
                    heightArr:heightArr
                })
            })
        }, 1000)
    },

    /**
     * 组件的方法列表
     */
    methods: {
        swiperChange(e) {
            const {
                source,
                current
            } = e.detail;
            if (source == 'touch') {
                const currentIndex = current;
                this._setChangeData({
                    currentIndex
                });
            }
        },
        handleChange(e) {
            const currentIndex = e.currentTarget.dataset.index;
            this.setData({
                toViewR: "r-" + currentIndex,
                currentIndex
            })
        },

        handleRightScroll(e) {
            var oneShow = this.data.oneShow
            let scrollTop = e.detail.scrollTop
            let scrollArr = this.data.heightArr
            const currentIndex = e.currentTarget.dataset.index;
            let leftTop = this.data.leftTop;
            const leftItemHeight =  this.data.left_item_height
            const marginTopIndex = 5
            for (let i = 0; i < scrollArr.length; i++) {
                if (scrollTop >= 0 && scrollTop < scrollArr[0]) {
                    if (oneShow) {
                        this.setData({
                            currentIndex: 0,
                            oneShow: false
                        })
                        return
                    }
                } else if (scrollTop + 200 >= scrollArr[i-1] && scrollTop + 200 < scrollArr[i]) {
                    if ( i != currentIndex) {
                        // 动态滚动左侧 scroll-view item
                        if (i >= marginTopIndex) {
                            leftTop = leftItemHeight * (i - marginTopIndex)
                        } else {
                            leftTop = 0
                        }
                        this.setData({
                            oneShow: true,
                            currentIndex: i,
                            toViewL: "l-" + currentIndex,
                            leftTop: leftTop
                        })
                    }
                }
            }
        },

    }
});