/* External Pages transport; original module iframe bridges remain unchanged. */
(function(){'use strict';
  const APP='ERH_APP_TOTAL_PAGES_P2F1020';
  // Set only after creating a NEW TEST deployment in the confirmed App Total project.
  const ENDPOINT='https://script.google.com/macros/s/AKfycbyOfAesc3_-60IPPFmT78FFEWWSWMa8SHGbbWiCS36ZnftKqv_FdkHVIVHlljjTtdq5rw/exec';
  const errors={BUSINESS_API_NOT_ACCEPTED:'Chức năng này chưa được nghiệm thu kết nối API trên bản Pages TEST.',TEST_SCRIPT_ONLY:'Đường dẫn API không thuộc App Tổng TEST đã xác nhận.',SESSION_INVALID:'Phiên đăng nhập không còn hiệu lực.'};
  function request(method,args){return new Promise((resolve,reject)=>{
    if(!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(ENDPOINT)){reject(Error('Chưa cấu hình URL triển khai App Tổng TEST mới trong transport.js.'));return;}
    const nonce=Array.from(crypto.getRandomValues(new Uint8Array(20)),b=>b.toString(16).padStart(2,'0')).join('');
    const frame=document.createElement('iframe'),form=document.createElement('form');
    frame.name='erh_'+nonce;frame.hidden=true;form.hidden=true;form.method='POST';form.action=ENDPOINT;form.target=frame.name;
    let done=false,timer;
    function finish(err,value){if(done)return;done=true;clearTimeout(timer);window.removeEventListener('message',receive);form.remove();frame.remove();err?reject(err):resolve(value);}
    function receive(event){
      if(event.origin!=='https://script.google.com'&&event.origin!=='https://script.googleusercontent.com'&&!/^https:\/\/[a-z0-9-]+\.googleusercontent\.com$/.test(event.origin))return;
      const d=event.data;if(!d||d.app!==APP||d.nonce!==nonce)return;
      d.ok===true?finish(null,d.value):finish(Error(errors[d.error]||'Không hoàn tất yêu cầu máy chủ TEST.'));
    }
    Object.entries({nonce,method,args:JSON.stringify(args)}).forEach(([name,value])=>{const input=document.createElement('input');input.type='hidden';input.name=name;input.value=value;form.appendChild(input);});
    window.addEventListener('message',receive);document.body.append(frame,form);
    timer=setTimeout(()=>finish(Error('Chưa nhận phản hồi sau 40 giây. Yêu cầu không được tự động gửi lại.')),40000);
    try{form.submit();form.remove();}catch(e){finish(Error('Không gửi được yêu cầu máy chủ.'));}
  });}
  function runner(success,failure,context){return new Proxy({}, {get(_,name){
    if(name==='withSuccessHandler')return fn=>runner(fn,failure,context);
    if(name==='withFailureHandler')return fn=>runner(success,fn,context);
    if(name==='withUserObject')return value=>runner(success,failure,value);
    if(typeof name!=='string'||name==='then')return undefined;
    return (...args)=>{request(name,args).then(value=>{if(success)success(value,context);},error=>{if(failure)failure(error,context);});};
  }});}
  window.google={script:{run:runner(null,null,null)}};
})();
