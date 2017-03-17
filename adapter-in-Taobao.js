/**
 * Created by yanning on 2017/2/25.
 */
(function(document,window){
  'use strict'
  var scale= 0,
      dpr= 0,
      winWidth,
      scaleInfi,
      metaNode=document.querySelector("meta[name='viewport']");
      if(metaNode){
        scaleInfi=metaNode.getAttribute('content').match(/initial\-scale=(\d+\.)/);
        if(scaleInfi){
          dpr=parseInt(1/scaleInfi[1]);
          scale=scaleInfi[1];
        }
      }else{
        winWidth=window.getComputedStyle(document.documentElement).width;
        dpr=parseInt(winWidth)/window.innerWidth;
        scale=(1/dpr).toFixed(2);
      }
  if(!scaleInfi){
    var meta=document.createElement('meta');
    meta.setAttribute('name','viewport');
    meta.setAttribute('content','initial-scale='+scale+",userscalable=no");
    document.documentElement.firstElementChild.appendChild(meta);
  }
  var fn=function(){
    document.documentElement.style.fontSize=20*dpr+'px';
  }
  document.addEventListener('DOMContentLoaded',fn,false);
  window.addEventListener('onorientationchange',fn,false);
})(document,window);

;(function(){
  var scale,
      timer,
      dpr,
      doc=window.document,
      docElem=doc.documentElement,
      vpmeta=document.querySelector('meta[name=viewport]');
      flexMeta=window.document.querySelector('meta[name=flexiable]');
  if(vpmeta){
    console.warn('使用已经设置的viewport进行缩放');
    var initial=vpmeta.getAttribute('content').match(/initail-scale=([\d\.]+)/);
    if(initial){
      scale=initial[1];
      dpr=(1/scale).toFixed(2);
    }
  }else if(flexMeta){
    var flexMetaContent=flexMeta.getAttribute('content');
    if(flexMetaContent){
      var initial=flexMetaContent.match(/initial-dpr=([\d\.]+)/);
      var maximum=flexMetaContent.match(/maximum-dpr=([\d\.]+)/);
      if(initial){
        dpr=initial[1];
        scale=(1/dpr).toFixed(2);
      }
      if(maximum){
        dpr=maximum[1];
        scale=(1/dpr).toFixed(2);
      }
    }
  }
  if(!dpr&&!scale){
    var _dpr=window.devicePixelRatio,
    //下面这句就是将u设置为iPhone,逗号只是去后面的值
        u=(window.navigator.appVersion.match(/android/gi),window.navigator.appVersion.match(/iphone/gi))
    //不是iphone就用1倍的屏,因为很多Android设置并不标准
    u?((_dpr>=3)&&(!dpr||dpr>=3)?3:
        (_dpr>=2)&&(!dpr||dpr>=3)?2:
            1):
    1;
    scale=(1/dpr).toFixed(2);
  }
  docElem.setAttribute('data-dpr',dpr);
  //动态生成meta子节点
  if(!vpmeta){
    var vpmeta=document.createElement('meta');
    vpmeta.setAttribute('name','viewport');
    vpmeta.setAttribute('content','initial-width='+scale+",maximum-scale="+scale+',user-scalable=1');
    if(docElem.firstElementChild){
      docElem.firstElementChild.appendChild(vpmeta);
    }else{
      //此处有疑问 为什么要判断根元素是否具有子节点
      var wrap=document.createElement('div');
      wrap.appendChild(vpmeta);
      document.write(wrap.innerHTML);
    }
  }
  refreshRem=function(){
    var width=docElem.getBoundingClientRect().width;//获得根元素的宽度 获取的visualpoint 缩放后不是980
    if(width/dpr>540){
      width=dpr*540;
    }
    var baseSize=width/10;//讲真个宽度分为十份
    docElem.style.fontSize=baseSize+'px';
    flexible.rem=window.rem=baseSize;
  }
  window.addEventListener('resize',function(){
    clearTimeout(timer);
    timer=setTimeout(refreshRem,300);
  },false);
  //pageshow基于往返缓存特性 在用户使用前进或后退按钮是加快页面的更新速度,这个缓存中不仅保存着页面的数据 而且保存着DOM和JavaScript的状态
  //persisted为true时表示页面保存在了bfcache中
  //第一次加载persisted为空
  window.addEventListener('pageshow',function(e){
    if(e.persisted){
      clearTimeout(timer);
      timer=setTimeout(refreshRem,300);
    }
  },false);

  if('complete'===document.readyState){
    document.body.style.fontSize=12*dpr+'px';
  }else{
    document.addEventListener('DOMContentLoaded',function(){
      document.body.style.fontSize=12*dpr+'px'
    },false);
  }
  //第一次初始化
  refreshRem();
  flexible.dpr=win.dpr=dpr;
  flexible.refreshRem=refreshRem;
  //把rem与px进行转换
  flexible.rem2px=function(d){
    var c=parseFloat(d)*this.rem;
    if('string'===typeof d&& d.match(/rem$/)){
      c+='px';
    }
    return c;
  }
  flexible.px2rem-function(d){
    var c=parseFloat(d)/this.rem;
    if('string'===typeof d && d.match(/px$/)){
      c+='rem';
    }
    return c;
  }
})(window,window.lib||(window.lib={}))