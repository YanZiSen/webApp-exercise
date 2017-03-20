/**
 * Created by yanning on 2017/3/19.
 */
if (!window.swip){
  window.swip={}
};
swip.iScroll=function(args){
/*  console.log(this);
  if(!(this instanceof swip.iScroll)){return new swip.iScroll(args);}
  this.init(args);*/
  /*var obj=new swip.iScroll();
  obj.init(args);*/
}
swip.iScroll.prototype={
  instructor:swip.iScroll,
  parentDom:null,
  init:function(args) {
    var that = this;
    if (args.swipDom && args.swipDom.nodeType) {
      that.parentDom = args.swipDom;
    } else {
      return false;
    }
    that.childDom = that.parentDom.children ? that.parentDom.children[0] : '';
    console.log(that.childDom);
    if (!that.childDom) {
      return false
    }
    that.settings={};
    that.settings.type = args.swipType ? args.swipType:'y';
    that.settings.distance = args.distance ? args.distance : 150;
    that._scroll();
  },
  setTrans:function(translate){
    this.curPos=translate;
    this._add();
    this._changeTrans(translate);
  },
  _add:function(){
    this.childDom.style.transition='all .2s ease-in-out';
    this.childDom.style.webkitTransition='all .2s ease-in-out';
  },
  _remove:function(){
    this.childDom.style.transition='none';
    this.childDom.style.webkitTransition='none';
  },
  _changeTrans:function(dis){
    if(this.settings.type==='y'){
      this.childDom.style.transform='translateY('+dis+'px)';
      this.childDom.style.webkitTransform='translateY('+dis+'px)';
    }else{
      this.childDom.style.transform='translateX('+dis+'px);';
      this.childDom.style.webkitTransform='translateX('+dis+')';
    }
  },
  _scroll:function(){
    var maxDistance= 0,
        that=this,
        type=that.settings.type==='y'?true:false;
        pHeight='y'?that.parentDom.offsetHeight:that.parentDom.offsetWidth;
        cHeight='y'?that.childDom.offsetHeight:that.childDom.offsetWidth;
    if(cHeight<pHeight){
      cHieght=pHeight;
    }
    var minDistance=that.parentDom.offsetHeight-that.childDom.offsetHeight
        distance=that.settings.distance;
    that.startPos=0;that.movePos=0;that.endPos=0,that.curPos=0;
    /*为子盒子绑定监听事件 如果在区间内那么就将盒子移动到该位置*/
    that.childDom.addEventListener('touchstart',function(e){
      that.startPos=type? e.touches[0].clientY: e.touches[0].clientX;
      if(that.startPos<maxDistance+distance&&that.startPos>minDistance-distance){

      }
    },false);
    that.childDom.addEventListener('touchmove',function(e){
      e.preventDefault();
      that.endPos=type? e.touches[0].clientY: e.touches[0].clinetX;
      that.movePos=that.endPos-that.startPos;
      if(that.curPos-that.movePos<maxDistance+distance&&
      that.curPos-that.movePos>minDistance-distance){
        that._remove();
        that._changeTrans(that.curPos-that.movePos);
      }
    },false);
    that.childDom.addEventListener('touchend',function(e){
      if(that.curPos-that.movePos>maxDistance){
        that.curPos=maxDistance;
        that._add();
        that._changeTrans(that.curPos);
      }else if(that.curPos-that.movePos<minDistance){
        that.curPos=minDistance;
        that._add();
        that._changeTrans(that.curPos);
      }else{
        that.curPos=that.curPos-that.movePos;
      }
      that._reset();
    },false);
  },
  _reset:function(){
    var that=this;
    that.startPos=0;
    that.endPos=0;
    that.movePos=0;
  }
}