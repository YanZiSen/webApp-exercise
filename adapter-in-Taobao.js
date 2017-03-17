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
    console.warn('ʹ���Ѿ����õ�viewport��������');
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
    //���������ǽ�u����ΪiPhone,����ֻ��ȥ�����ֵ
        u=(window.navigator.appVersion.match(/android/gi),window.navigator.appVersion.match(/iphone/gi))
    //����iphone����1������,��Ϊ�ܶ�Android���ò�����׼
    u?((_dpr>=3)&&(!dpr||dpr>=3)?3:
        (_dpr>=2)&&(!dpr||dpr>=3)?2:
            1):
    1;
    scale=(1/dpr).toFixed(2);
  }
  docElem.setAttribute('data-dpr',dpr);
  //��̬����meta�ӽڵ�
  if(!vpmeta){
    var vpmeta=document.createElement('meta');
    vpmeta.setAttribute('name','viewport');
    vpmeta.setAttribute('content','initial-width='+scale+",maximum-scale="+scale+',user-scalable=1');
    if(docElem.firstElementChild){
      docElem.firstElementChild.appendChild(vpmeta);
    }else{
      //�˴������� ΪʲôҪ�жϸ�Ԫ���Ƿ�����ӽڵ�
      var wrap=document.createElement('div');
      wrap.appendChild(vpmeta);
      document.write(wrap.innerHTML);
    }
  }
  refreshRem=function(){
    var width=docElem.getBoundingClientRect().width;//��ø�Ԫ�صĿ�� ��ȡ��visualpoint ���ź���980
    if(width/dpr>540){
      width=dpr*540;
    }
    var baseSize=width/10;//�������ȷ�Ϊʮ��
    docElem.style.fontSize=baseSize+'px';
    flexible.rem=window.rem=baseSize;
  }
  window.addEventListener('resize',function(){
    clearTimeout(timer);
    timer=setTimeout(refreshRem,300);
  },false);
  //pageshow���������������� ���û�ʹ��ǰ������˰�ť�Ǽӿ�ҳ��ĸ����ٶ�,��������в���������ҳ������� ���ұ�����DOM��JavaScript��״̬
  //persistedΪtrueʱ��ʾҳ�汣������bfcache��
  //��һ�μ���persistedΪ��
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
  //��һ�γ�ʼ��
  refreshRem();
  flexible.dpr=win.dpr=dpr;
  flexible.refreshRem=refreshRem;
  //��rem��px����ת��
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