/**
 * Created by yanning on 2017/3/17.
 */
(function(window,document){
  $(function(){
    search();
  });
  var search=function(){
    var $header=$('#header');
    var $banner=$('.slider-box'),height=$banner[0].offsetHeight;
    $(window).on(
        'scroll',
        function(){
          bHeight=$(document.body).scrollTop();
          console.log(height+'-'+bHeight);
          if(bHeight>height){
            $header.css('background-color','rgba(201,21,35,0.85)');
          }else{
            var b=Math.floor(bHeight/height)*0.85;
            $header.css('background-color','rgba(201,21,35,'+b+')');
          }
        }
    );
  };
  var banner=function(){

  }
})(window,document);