/**
 * Created by yanning on 2017/3/17.
 */
(function (window, document) {
  $(function () {
    search();
    banner();
  });
  var search = function () {
    var $header = $('#header');
    var $banner = $('.slider-box'), height = $banner[0].offsetHeight;
    $(window).on(
        'scroll',
        function () {
          bHeight = $(document.body).scrollTop();
          if (bHeight > height) {
            $header.css('background-color', 'rgba(201,21,35,0.85)');
          } else {
            var b = bHeight / height * 0.85;
            console.log(height);
            console.log(b);
            $header.css('background-color', 'rgba(201,21,35,' + b + ')');
          }
        }
    );
  };
  var banner = function () {
    var index = 1,
        bannerBox = document.querySelector('.slider-box'),
        dot = document.querySelector('.slider .dot'),
        w = document.querySelector('.slider').offsetWidth,
        points=dot.getElementsByTagName('li'),
        timer;

    function add() {
      bannerBox.style.transition = 'transform 0.3s ease-in-out';
      bannerBox.style.webkitTransform = 'transform 0.3s ease-in-out';
    }

    function remove() {
      bannerBox.style.transition = 'none';
      bannerBox.style.webkitTransform = 'none';
    }

    function move(distance) {
      bannerBox.style.transform = 'translateX(' + distance + 'px)';
    }
    /*1.自动的滚起来*/
    timer = setInterval(
        function () {
          index++;
          add();
          move(-index*w);
        }
        , 3000);
    var change = function () {
      if (index >= 9) {
        index = 1;
        console.log(1);
        remove();
        move(-index*w);
      } else if (index <= 0) {
        remove();
        move(-index*w);
      }
      setPoint();
    };
    bannerBox.addEventListener('webkitTransitionEnd',change, false);
    /*2.点随之动起来*/
    var setPoint=function(){
      for(var i= 0,l=points.length;i<l;i++){
        points[i].className='';
      }
      points[index-1].className='active';
    }
    /*3.滑动*/
    var distance= 0,startX= 0,moveX,autoMove=false;
    bannerBox.addEventListener('touchstart',function(e){
      clearInterval(timer);
      startX= e.touches[0].clientX;
      //autoMOve=false;
    },false);
    bannerBox.addEventListener('touchmove',function(e){
      autoMove=true;
      moveX= e.touches[0].clientX;
      distance=moveX-startX;
      var curX=w*index*(-1)-distance;
      remove();
      move(curX);
    });
    bannerBox.addEventListener('touchend',function(){
      if(Math.abs(distance)>w/3&&autoMove){
        move(distance>0?-(index+1)*w:-(index-1)*w);
      }else{
        /*吸附回去*/
        add();
        move(-index*w);
      }
      startX=0,distance=0,moveX=0,autoMove=false;
      clearInterval(timer);
      timer=setInterval(function(){
        index++;
        add();
        move(-index*w);
      },3000);
    });
  }
})(window, document);