## �ʼ�
   * reset
   <pre>
        -webkit-tap-highlight-color:transparent;//������Ĭ�ϵĸ���Ч��
        input.textarea{
        border:none;
        resize:none;
        outline:none;
        -webkit-appearance:none;}
    </pre>
   * �������
## �״�����
   ####  ��ӵ�֪ʶ��
   * **width:auto��width:100%������ width:auto�������ȵ��ڸ����������Ŀ��,��100%ָ�����������Ŀ�ȵ��ڸ�Ԫ���������Ŀ��**
   * �п�����Ƶ���ҳ����(��ֹ��С�ƻ����� ������ͼƬ) ������ȵķ��಼�� �����Ƶ���ʽ����
   * bodyĬ�ϵ���ɫ���Ϊȫ��
   * ::before��:before������ ǰ��IE8��֧�� ����֧�� IE��֧��αԪ�ص�z-index
   * sans-serif ����ĳ����������� ������ǰ�������ʧЧ���ȡ��������
   * touch�¼�
    <pre>
    touchstart:

   </pre>
   * ��������ӻ�����
      * innerWidth��innerHeight IE document.documentElement.clientWidth/document.documentElement.clientHeight
   * element���ӻ�����
      * element.clientWidth element.clientHeight ����Ԫ�ص�����߾�ͱ߿�
        element.getBoundingClientRect()����һ������bottom top left right width height�Ķ��� IEֻ����width��height
   * �ƶ������������С�ķ���
       1. ý���ѯ��̬����rem
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
       2. ʹ��js����̬����
       <pre>
       (function(window,document){
           //���������л�ʱ
           var breakevent='onorientationchange' in window ?||'onorientationchange':'resize';
           fn=function(){
               var width=document.clientwidth;
               width&&(document.documentElement.style.fontSize=20*(width/innerwidth)+'px');
           }
           window.addEventListener(breakevent,fn,false);
           document.addEventListener('DOMContentLoaded',fn,false);
       })(window,document)
       </pre>
       * �ο��Ա�flexible�Ŀ�,��̬����meta��ǩ,����dpr��̬����remʵ������Ĵ�С��ͬ����
     * //����DOM�ĵ����صĲ���Ϊ
        1. ����HTML�ṹ
        2. �����ⲿ�ű�����ʽ���ļ�
        3. ������ִ�нű�����
        4. DOM���������//DOMContendLoaded
        5. ����ͼƬ���ⲿ�ļ�,iframe���첽����ȶ���� �ļ��������load;

     * ͼƬ@media��ѯ����������� //js���
     <pre>
          $('img').each(function(i){
              newSrc=src.replace('.','@2x.');
              $(this).src(newSrc);
          })//ȱ���������
     </pre>

#### bug��bug�޸�


  * viewport����
    * layout viewport:Ĭ�ϵ��ֻ��������� Ϊ���ǲ�ʹ����ҳ�Ķ�������һ��document.documentElement.clientwidth;//document.body.width
    * ����Ĥ��1px�Ķ���Ϊ�˲���ʾ�Ĺ�С,����1 css������Ҫ�����������سߴ�
    * visual viewportָ�����������������Ĵ�С ͨ��window.innerWidth��ȡ
    * idea viewport����css���ص͵��ƶ��豸����������
    * ��������width=400��initail-scale=1�������ʹ�ýϴ���Ǹ�ֵ;
    * initial-scale�����ideaviewport�������ŵ� �����õĻ����Զ����ŵ� ���õĻ������0.5��Ļ�Ŀ��Ϊ320px,��ô�ͱ�Ϊ640px,Ҳ����˵640pxռ��;
  *
    <form>
        <input type='search'>;����С����
    </form>
   * ####������������
   * �����������ԭ�� �����header�������
   * ������Ϊʲôû����form��������
   * ΪʲôҪ��box-sizing Ϊ����
   * ����300-750��ԭ����ʲô
   * ���ò��ֵ���ȡ ���廯��ǩ��ʹ��
   * inline-block����һ��inline-block�Ĵ�ֱ��������
      *  **֪ʶ�����:inline-block+vertical-align:middleֻ�Ƕ���ͬһ�ж���,���ڸ��ӹ�ϵ��ֱ����û������**
      *  **vertcla-align:middle+line-heightʵ��**
      *  line-height��text-align�м̳���
   * ��Ʒģ������ͼƬ�Ķ�������
      * ��ߵ�һ���������Ƕ��һ����,��vertical-align���;
   * װ���͵�Сͼ����α��
   * α��Ҫ����ʾ���ݱ�����content����
   * ʲôʱ�򶨸� ʲôʱ����a
   * �ֲ�ͼ�ı�ű���ʹ��absolute ��ռԭ���Ŀռ� relative��Ȼ���Ըı�λ�� ѹסԪ�ص����޷���ռԭ����λ��
   * ����Ԫ�ذ����鼶Ԫ��display:block;

   #### ���ﳵ����

   * ������Ӫ�뾩��logo�޷�����ĵ�ԭ��
        <pre>
            <h3 line-height>
                <span>logo inline-block vertical-align</span>
                <span>������Ӫ</span>
            </h3>
        </pre>
   * ����Ԫ��û���� ��line-heightҲû��
   * ���ﳵҳ����������
     * text-overflow:clip(����),elipsis(ʡ�Ժ�),string(ָ��������);
     * white-space:nowrap һ������ʾ
   * ����ҳ�м�û����input input����Ҫ��tel �����������븸Ԫ������Ƶ�����
   * ��ƵҲ�Ľṹ����
      * imgû����a������ ������a����li������������������
   * absolute��float������ float���Բ�ռ�ռ䵫��Ҫ��˳���ϵĿ���
   * ����margin-bottom��������after��,��������֮��

   #### ����ҳ������
   * ��������������ťû����a span�����ò��Ҷ�һ��div
   * ��ť������ƴ�һЩ ��ע�û�����
   * background-image��background-clip��background-origin������֪ʶä��
       * IE9+   IE9+;
   * ����:����ͼ��С���� li+ͼƬ�б�Ĵ���ʽ ����item������ padding/2+��Ԫ��padding/2;
   * how to vertical align input
   * ��Ԫ��formҪ��һ��font-size���ܽ������

   * ������Դ�С ��Ļ�ߴ�仯ʱ�����еĴ���;
   * �߷ֱ�����border-width������
     1. div widthģ��
     2. :after css3 ģ�� scale������������Ԫ������  ��ʵ����ʵ��.5px���� �Ա��Ķ�̬�趨viewport�������һ��

   #### ���ֲ�
   * ����line-height������p�� ������margin-top��margin-bottom


