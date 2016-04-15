/**
 * name: pull-to-refresh plugins
 * author: MrKou47
 * date :16/4/14
 * description: 基于iscroll的下拉/上滑插件
 * usage: require("until.js")
 * copyright © 2016 Koubo. All rights reserved. 
 * website: mrkou47.github.io
 */

;(function ($) {
    var headImg,
        footImg,
        headImgHasClass,
        footImgHasClass;
    /* 接受zepto对象，生成带有刷新的scroller */
    function PullToRefresh(ele,opt) {
        this.$ele = ele;
        this.defaults = {
            delector: { //选择器
                container: '.wrapper', //iscroller的盒子
                headBox: '.head',   //头部更新盒子
                footBox: '.foot' //上拉刷新盒子
            },
            scrollSettings: {
                probeType: 3,
                mouseWheel: true
            },
            loadUrl: 'img/ajax-loader.gif', //加载的url
            arrowUrl: 'img/arrow.png',  //下拉刷新的url
            initScroll: -100,   //初始滚动大小
            maxScrollY: 100,
            pulltoload: null,
            refresh: null
        };
        this.options = $.extend({}, this.defaults, opt);
        this.myScroll = null;
    }
    PullToRefresh.prototype = {
        _init: function () {
            // 定义变量
            var headImg = $(this.options.delector.headBox).find('img'),
                footImg = $(this.options.delector.footBox).find('img'),
                headImgHasClass = headImg.hasClass('up'),
                footImgHasClass = headImg.hasClass('down'),
                headerH = this._getHeadHeight();
                pulltoload = this.options.pulltoload;
                refresh = this.options.refresh;
            /* 创建 iscroll 对象 */
            this.myScroll = new IScroll(this.options.delector.container,
                            this.options.scrollSettings);
            this.myScroll.scrollBy(0,-headerH);  //先向上滚动一个head的距离
            /* 绑定方法 */
            this.myScroll.on('scroll', function(event) {
                var y = this.y,
                    maxY = this.maxScrollY - y;
                if (y >= 0) {
                    !headImgHasClass && headImg.addClass('up');
                    return '';
                }
                if (maxY >= 0) {
                    !footImgHasClass && footImg.addClass('down');
                    return '';
                }
            });
            /* 滚动结束时候触发 */
            this.myScroll.on('scrollEnd', function () {
                var self = this;
                // var headerH = _getHeadHeight();
                /* 当 scroll 向上滚动，同时滚动的距离并没有超过head的高度，则归位  */
                if (self.y >= -headerH && self.y < 0) {
                    self.scrollTo(0, -headerH);
                    headImg.removeClass('up');
                /* 当 scroll 向上滚动，同时滚动的距离超过head的高度，则触发更新ajax事件  */
                } else if (self.y >= 0) {
                    headImg.attr('src', 'img/ajax-loader.gif');
                    //TODO ajax下拉刷新数据
                    if (refresh) {
                        refresh();
                    };
                    console.log(headImg);
                    console.log(headImg.attr('src'));
                    setTimeout(function () {
                        self.refresh();
                        headImg.removeClass('up');
                        headImg.attr('src', 'img/arrow.png');
                        self.scrollTo(0, -headerH);
                    }, 1000);
                }

                var maxY = self.maxScrollY - self.y;
                if (maxY > -headerH && maxY < 0) {
                    self.scrollTo(0, self.maxScrollY + headerH);
                    footImg.removeClass('down')
                } else if (maxY >= 0) {
                    console.log(footImg);
                    console.log(footImg.attr('src'));
                    footImg.attr('src', 'img/ajax-loader.gif');
                    //TODO ajax上拉加载数据
                    if (pulltoload) {
                        pulltoload();
                    };
                    setTimeout(function () {
                        self.refresh();
                        self.scrollTo(0, self.y + 100);
                        footImg.removeClass('down');
                        footImg.attr('src', 'img/arrow.png');
                    }, 1000);
                }
            })
        },
        // 获得head的高度
        _getHeadHeight:function () {
            return $(this.options.delector.headBox).height();
        }
    }
    $.fn.pulltorefresh = function (option) {
        console.log(1)
        var sObj = new PullToRefresh(this,option);
        return sObj._init();
    }
})($);
