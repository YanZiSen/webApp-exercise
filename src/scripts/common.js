/**
 * Created by yanning on 2017/3/19.
 */
var swip={};
swip.tap=function(dom,callback){
  var time,isMove=false;
  dom.addEventListener('touchstart',function(e){
    time=Date.now();
  });
  dom.addEventListener('touchmove',function(e){
    isMove=true;
  });
  dom.addEventListener('touchend',function(e){
   /* var endTime=new Date();*/
    if(Date.now()-time<150&&!isMove){
      callback&&callback.call(dom,e);
    }
    isMove=false;
    time=0;
  });
}
