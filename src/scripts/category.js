/**
 * Created by yanning on 2017/3/19.
 */
window.onload=function(){
  slideRight();
  var obj=new swip.iScroll();
  obj.init({
    swipDom:document.querySelector('.detail'),
    distance:120
  });
}
var slideRight=function(){
  var listBox=document.querySelector('.list-box'),
      lis=listBox.querySelectorAll('li');
      parent=document.querySelector('.aside'),
      pHeight=parent.offsetHeight,
      lHeight=listBox.offsetHeight,
      maxH= 0,minH=pHeight-lHeight,
      distance=150;
  var add=function(){
    listBox.style.transition='all .3s';
    listBox.style.webkitTransition='all .3s';
  }
  var remove=function(){
    listBox.style.transition='none';
    listBox.style.webkitTransition='none';
  }
  var setTransform=function(dis){
    listBox.style.transform='translateY('+dis+'px)';
    listBox.style.webkitTransform='translateY('+dis+'px)';
  }
  var startPos= 0,endPos= 0,movePos= 0,curPos=0;
  listBox.addEventListener('touchstart',function(e){
    startPos= e.touches[0].clientY;
  },false);
  listBox.addEventListener('touchmove',function(e){
    endPos= e.touches[0].clientY;
    movePos=endPos-startPos;
    if(curPos-movePos>minH-distance&&curPos-movePos<distance){
      setTransform(curPos-movePos);
    }
  },false);
  listBox.addEventListener('touchend',function(){
    if(curPos-movePos>=0){
      add();
      setTransform(0);
      curPos=0;
    }else if(curPos-movePos<=minH){
      add();
      setTransform(minH);
      curPos=minH;
    }else{
      curPos=curPos-movePos;
    }
  },false);
  swip.tap(listBox,function(e){
    var tar= e.target;
    e.preventDefault();
    for(var i= 0,len=lis.length;i<len;i++){
      lis[i].className=' ';
      lis[i].index=i;
    }
    if(tar.nodeName.toUpperCase()==='A'){
      tar=tar.parentNode;
    }
    if(tar.nodeName.toUpperCase()==='LI'){
      tar.className='active';
    }
    var distance=-tar.index*50;
    if(distance>minH){
      curPos=distance;
      add();
      setTransform(distance);
    }else{
      curPos=minH;
      add();
      setTransform(minH);
    }
  });
}