/**
 * Created by Eugene on 16/1/5.
 */

$(document).ready(function() {
    var myScroll = new IScroll('.wrapper', {
        probeType: 3,
        mouseWheel: true
    });
    myScroll.scrollBy(0, -100);

    var head = $('.head img'),
        topImgHasClass = head.hasClass('up');
    var foot = $('.foot img'),
        bottomImgHasClass = head.hasClass('down');
    console.log(topImgHasClass)
    console.log(bottomImgHasClass)
    // myScroll.on('scroll', function () {
    //     var y = this.y,
    //         maxY = this.maxScrollY - y;
    //         console.log(y);
    //         console.log(this.maxScrollY);
    //     if (y >= 0) {
    //         !topImgHasClass && head.addClass('up');
    //         return '';
    //     }
    //     if (maxY >= 0) {
    //         !bottomImgHasClass && foot.addClass('down');
    //         return '';
    //     }
    // });

    myScroll.on('scrollEnd', function () {
        var self = this;
        if (self.y >= -100 && self.y < 0) {
            console.log(self.y);
            myScroll.scrollTo(0, -100);
            head.removeClass('up');
        } else if (self.y >= 0) {
            head.attr('src', 'img/ajax-loader.gif');
            //TODO ajax下拉刷新数据

            setTimeout(function () {
                myScroll.scrollTo(0, -100);
                head.removeClass('up');
                head.attr('src', 'img/arrow.png');
            }, 1000);
        }

        var maxY = self.maxScrollY - self.y;
        console.log(self.maxScrollY)
        if (maxY > -100 && maxY < 0) {
            myScroll.scrollTo(0, self.maxScrollY + 100);
            foot.removeClass('down')
        } else if (maxY >= 0) {
            foot.attr('src', 'img/ajax-loader.gif');
            //TODO ajax上拉加载数据

            setTimeout(function () {
                $('.foot').before(
                    '<div class="item">add 1</div>'+
                    '<div class="item">add 2</div>'+
                    '<div class="item">add 3</div>'+
                    '<div class="item">add 4</div>'+
                    '<div class="item">add 5</div>'
                );
                myScroll.refresh();

                myScroll.scrollTo(0, self.y + 100);
                foot.removeClass('down');
                foot.attr('src', 'img/arrow.png');
            }, 1000);
        }
    })
    // console.log(maxScrollY)
});

