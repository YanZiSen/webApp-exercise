/**
 * Created by yanning on 2017/3/17.
 */
(function(window,document){
  $(function(){
    search();
    banner();
  });
  var search=function(){
    var $header=$('#header');
    var $banner=$('.slider-box'),height=$banner[0].offsetHeight;
    $(window).on(
        'scroll',
        function(){
          bHeight=$(document.body).scrollTop();
          if(bHeight>height){
            $header.css('background-color','rgba(201,21,35,0.85)');
          }else{
            var b=bHeight/height*0.85;
            console.log(height);
            console.log(b);
            $header.css('background-color','rgba(201,21,35,'+b+')');
          }
        }
    );
  };
  var banner=function(){
    var index= 1,
        bannerBox=document.querySelector('.slider-box'),
        dot=document.querySelector('.slider .dot'),
        w=document.querySelector('.slider').offsetWidth,
        timer;
    function add(){
      bannerBox.style.transition='transform 0.3s ease-in-out';
      bannerBox.style.webkitTransform='transform 0.3s ease-in-out';
    }
    function remove(){
      bannerBox.style.transition='none';
      bannerBox.style.webkitTransform='none';
    }
    function move(n){
      bannerBox.style.transform='translateX(-'+n*w+'px)';
    }
    timer=setInterval(
          function(){
            if(index>8){
              remove();console.log(bannerBox.style.transition);
              index=1;move(index);
              console.log(bannerBox.style.transform);
            }else if(index<1){
              remove();index=8;move(index);
            }
            add();
            index++;
            move(index);
          }
      ,3000);
  }
})(window,document);