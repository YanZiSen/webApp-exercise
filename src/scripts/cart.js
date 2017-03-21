/**
 * Created by yanning on 2017/3/20.
 */
window.onload = function () {
  var container = document.querySelector('.mask'),
      confirm = container.querySelector('.confirm'), deleteBtn = null,
      item, items, checkWhich,
      winHeight=innerHeight,boxHeight,scrollH,
      btnContainer=container.querySelector('.container');
      trashCan = document.querySelectorAll('.delete');
  console.log(boxHeight);
  for (var i = 0, len = trashCan.length; i < len; i++) {
    swip.tap(trashCan[i], function (e) {
      deleteBtn = this;
      checkWhich = true;
      var top = this.querySelector('.top');
      top.style.transformOrigin = 'left bottom';
      top.style.transform = 'rotate(-45deg)';
      moveAnimate(top,function(){
        if(checkWhich){
          container.style.display='block';
          boxHeight=btnContainer.offsetHeight, scrollH=(winHeight-boxHeight)/2;
          console.log(1);
          btnContainer.style.transform='translateY('+scrollH+'px)';
          moveAnimate(btnContainer,.3);
        }
      });
    });
  }
  swip.tap(container, function (e) {
    if (e.target.nodeName.toUpperCase() === 'A') {
      e.preventDefault();
      this.style.display = 'none';
      checkWhich = false;
      if (e.target.className.indexOf('confirm') !== -1) {
        item = parent(deleteBtn, '.goods-item');
        items = parent(item, '.shop-box');
        /*console.log(item);console.log(items);*/
        items.Inum = items.Inum || 2;
        console.log(items.Inum);
        item.parentNode.removeChild(item);
        if (!--items.Inum) {
          items.parentNode.removeChild(items);
        }
      } else {
        var top = deleteBtn.querySelector('.top');
        top.style.transition = 'all 0.3s';
        top.style.transform = 'rotate(0deg)';
      }
      btnContainer.style.transform='';
    }
  });
  var btn = document.querySelectorAll('.delete')[0];
  console.log(btn.matchesSelector('.delete'));
}
var parent = function (dom, selector) {
  if (typeof selector !== 'string' || !dom) {
    return;
  }
  var parent = dom.parentNode;
  while (!parent.matchesSelector(selector) && parent) {
    parent = parent.parentNode;
   /* console.log(parent);*/
  }
  return parent ? parent : {};
}

if (!Element.prototype.matchesSelector) {
  Element.prototype.matchesSelector =
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function (s) {
        var parents = document.querySelectorAll(s), len = parents.length;
        while (--len >= 0 && parents[len] !== this) {
        }
        return len > -1;
      }
};
var moveAnimate=function (dom,callback,duration){
  if(this instanceof moveAnimate){return;}
  var obj=new moveAnimate();
  obj.init(dom,callback,duration);
}
moveAnimate.prototype={
  constructor:moveAnimate,
  duration:.3,
  dom:null,
  callback:null,
  _addTrans:function(){
    var that=this;
    if(!that.callback){return;}
    that.dom.addEventListener('transitionEnd',that.callback,false);
    that.dom.addEventListener('webkitTransitionEnd',that.callback,false);
  },
  _removeTrans:function(){
    var that=this;
    that.dom.style.transition='none';
    that.dom.style.webkitTransition='none';
  },
  add:function(){
    var that=this;
    that.dom.style.transition='all '+that.duration+'s';
    that.dom.style.webkitTransition='all '+that.duration+'s';
  },
  init:function(dom,callback,duration){
    console.log(arguments);
    if(dom&&dom.nodeType){this.dom=dom}else{return false}
    if(typeof callback==='function'){
      console.log(1);
      this.callback=callback;
    }else{
      duration=callback;
    }
    this.duration=duration||this.duration;
    this.add();this._addTrans();
  }
}
