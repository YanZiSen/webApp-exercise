## 笔记
   * reset
   <pre>
        -webkit-tap-highlight-color:transparent;//清除点击默认的高亮效果
        input.textarea{
        border:none;
        resize:none;
        outline:none;
        -webkit-appearance:none;}
    </pre>
   * 步骤归纳
## 易错点解析
   ####  添加的知识点
   * **width:auto与width:100%的区别 width:auto是总体宽度等于父级内容区的宽度,而100%指的是内容区的宽度等于父元素内容区的宽度**
   * 有宽度限制的首页布局(防止过小破坏布局 过大导致图片) 整屏宽度的分类布局 无限制的流式布局
   * body默认的颜色填充为全屏
   * ::before与:before的区别 前者IE8不支持 后者支持 IE不支持伪元素的z-index
   * sans-serif 不是某个字体的名称 而是在前面的字体失效后采取的新字体
   * touch事件
    <pre>
    touchstart:

   </pre>
   * 浏览器可视化区域
      * innerWidth与innerHeight IE document.documentElement.clientWidth/document.documentElement.clientHeight
   * element可视化区域
      * element.clientWidth element.clientHeight 包括元素的内外边距和边框
        element.getBoundingClientRect()返回一个包含bottom top left right width height的对象 IE只包含width和height
   * 移动端设置字体大小的方法
       1. 媒体查询动态设置rem
       <pre>
           @media screen and (min-width:320px){
               html:14px;
           }@media screen and (min-width:360px){
               html:16px;
           }....
           @media screen and(min-width:480px){
               html:22px;
           }@media screen and (min-width:640px){
               html:28px;
           }
       </pre>
       2. 使用js来动态设置
       <pre>
       (function(window,document){
           //横屏竖屏切换时
           var breakevent='onorientationchange' in window ?||'onorientationchange':'resize';
           fn=function(){
               var width=document.clientwidth;
               width&&(document.documentElement.style.fontSize=20*(width/innerwidth)+'px');
           }
           window.addEventListener(breakevent,fn,false);
           document.addEventListener('DOMContentLoaded',fn,false);
       })(window,document)
       </pre>
       * 参考淘宝flexible的库,动态创建meta标签,根据dpr动态设置rem实现字体的大小不同设置
     * //补充DOM文档加载的步骤为
        1. 解析HTML结构
        2. 加载外部脚本和样式表文件
        3. 解析并执行脚本代码
        4. DOM树构建完成//DOMContendLoaded
        5. 加载图片等外部文件,iframe等异步请求等都完毕 文件加载完毕load;

     * 图片@media查询解决适配问题 //js解决
     <pre>
          $('img').each(function(i){
              newSrc=src.replace('.','@2x.');
              $(this).src(newSrc);
          })//缺点加载两次
     </pre>

#### bug与bug修复


  * viewport属性
    * layout viewport:默认的手机浏览器宽度 为的是不使得网页的东西挤在一起document.documentElement.clientwidth;//document.body.width
    * 视网膜屏1px的东西为了不显示的过小,所以1 css的像素要代表更多的像素尺寸
    * visual viewport指的是浏览器可是区域的大小 通过window.innerWidth获取
    * idea viewport多少css像素低的移动设备可以满屏；
    * 当设置了width=400与initail-scale=1浏览器会使用较大的那个值;
    * initial-scale相对于ideaviewport进行缩放的 不设置的话是自动缩放的 设置的话如果是0.5屏幕的宽度为320px,那么就变为640px,也就是说640px占满;
  *
    <form>
        <input type='search'>;调出小键盘
    </form>
   * ####搜索栏的问题
   * 搜索栏两层的原因 里面的header宽度问题
   * 搜索栏为什么没有用form包起来？
   * 为什么要用box-sizing 为的是
   * 设置300-750的原因是什么
   * 公用部分的提取 语义化标签的使用
   * inline-block内套一个inline-block的垂直居中问题
      *  **知识点混淆:inline-block+vertical-align:middle只是对于同一行对齐,对于父子关系垂直居中没有意义**
      *  **vertcla-align:middle+line-height实现**
      *  line-height和text-align有继承性
   * 商品模块三张图片的对齐问题
      * 左边第一张下面总是多出一部分,用vertical-align解决;
   * 装饰型的小图标用伪类
   * 伪类要想显示内容必须有content属性
   * 什么时候定高 什么时候用a
   * 轮播图的标号必须使用absolute 不占原来的空间 relative虽然可以改变位置 压住元素但是无法不占原来的位置
   * 行内元素包裹块级元素display:block;

   #### 购物车问题

   * 京东自营与京东logo无法对齐的的原因
        <pre>
            <h3 line-height>
                <span>logo inline-block vertical-align</span>
                <span>京东自营</span>
            </h3>
        </pre>
   * 行内元素没内容 用line-height也没用
   * 购物车页面字体问题
     * text-overflow:clip(剪切),elipsis(省略号),string(指定的文字);
     * white-space:nowrap 一行内显示
   * 计算页中间没有用input input类型要用tel 三个单独设与父元素上设计的区别
   * 行频也的结构问题
      * img没有用a包起来 用整个a包起li更是脱离了生产环境
   * absolute与float的区别 float可以不占空间但是要有顺序上的考虑
   * 设置margin-bottom不会落在after上,作用在它之后

   #### 分类页的问题
   * 顶边栏的两个按钮没有用a span的滥用并且多一个div
   * 按钮尽量设计大一些 关注用户体验
   * background-image中background-clip和background-origin的作用知识盲点
       * IE9+   IE9+;
   * 问题:背景图大小问题 li+图片列表的处理方式 各个item间距相等 padding/2+父元素padding/2;
   * how to vertical align input
   * 父元素form要有一个font-size才能解决问题

   * 文字相对大小 屏幕尺寸变化时不换行的处理;
   * 高分辨率下border-width的问题
     1. div width模拟
     2. :after css3 模拟 scale的缩放中心是元素中心  其实就是实心.5px的线 淘宝的动态设定viewport解决了这一点

   #### 遮罩层
   * 利用line-height作用在p上 而不是margin-top和margin-bottom


