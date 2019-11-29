import scrollCenter from '../../miniprogram_npm/lin-ui/behaviors/scrollCenter';

var colors = ['red', 'purple', 'green', 'yellow', 'orange', 'brown']

Component({
    behaviors: [scrollCenter],
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
    relations: {
        '../my-tabpanel/index': {
            type: 'child',
            linked() {
                // 每次有子节点被插入时执行，target是该节点实例对象，触发在该节点attached生命周期之后
                this.initTabs();
            },
            unlinked() {
                this.initTabs();
            }
        },

    },
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
        activeKey: {
            type: String,
            value: '',
            observer: 'changeCurrent'
        },
        placement: {
            type: String,
            value: 'top',
        },
        animated: Boolean,
        swipeable: Boolean,
        scrollable: Boolean,
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
    },

    ready() {
        var that = this
        // this.initTabs();
        wx.createSelectorQuery().select('.l-tabs-item').boundingClientRect(function (rect) { // select
        }).exec(function (res) {

            // that.setData({
            //     left_item_height: res[0].height
            // })
        })
        // console.log("this.data.left_item_height", this.data.left_item_height)
        // wx.createSelectorQuery().selectAll()
    },


    /**
     * 组件的方法列表
     */
    methods: {
        initTabs(val = this.data.activeKey) {
            let items = this.getRelationNodes('../my-tabpanel/index');
            if (items.length > 0) {
                let activeKey = val,
                    currentIndex = this.data.currentIndex;
                const tab = items.map((item, index) => {

                    activeKey = !val && index == 0 ? item.data.key : activeKey;
                    currentIndex = item.data.key === activeKey ? index : currentIndex;
                    return {
                        tab: item.data.tab,
                        key: item.data.key,
                        icon: item.data.icon,
                        iconSize: item.data.iconSize,
                        image: item.data.image,
                        picPlacement: item.data.picPlacement,
                    };
                });
                this.setData({
                    tabList: tab,
                    activeKey,
                    currentIndex,
                }, () => {
                    if (this.data.scrollable) {
                        this.queryMultipleNodes();
                    }
                });
            }
        },
        swiperChange(e) {
            const {
                source,
                current
            } = e.detail;
            if (source == 'touch') {
                const currentIndex = current;
                const activeKey = this.data.tabList[current].key;
                this._setChangeData({
                    activeKey,
                    currentIndex
                });
            }
        },
        handleChange(e) {
            const activeKey = e.currentTarget.dataset.key;
            const currentIndex = e.currentTarget.dataset.index;
            this._setChangeData({
                activeKey,
                currentIndex,
            });
            console.log("handleChange")
            console.log('activeKey', activeKey)
            console.log('currentIndex', currentIndex)
            this.setData({
              toView:"d-"+currentIndex
            })
        },

        _setChangeData({
                           activeKey,
                           currentIndex
                       }) {
            this.setData({
                activeKey,
                currentIndex
            }, () => {
                if (this.data.scrollable) {
                    this.queryMultipleNodes();
                }
            });
            this.triggerEvent('linchange', {
                activeKey,
                currentIndex
            });
        }
    }
});