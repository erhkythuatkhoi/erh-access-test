(()=>{'use strict';
const root='/erh-access-test/cai-app-qlda/';
const status=document.getElementById('status'),btn=document.getElementById('install'),open=document.getElementById('open');
const say=t=>status.textContent=t;
const standalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
let target=null, installed=false, readySW=false;
if(![root,root+'index.html'].includes(location.pathname)){say('Sai đường dẫn QLDA. Không đăng ký Service Worker.');return;}
try{const u=new URL(window.QLDA_CONFIG?.TARGET_URL||'');if(u.protocol==='https:'&&u.hostname==='script.google.com'&&!u.username&&!u.password&&/^\/macros\/s\/[^/]+\/exec$/.test(u.pathname))target=u;}catch(_){}
if(!target){say('Chưa có URL QLDA hợp lệ.');return;}
open.href=target.href;open.removeAttribute('aria-disabled');
function render(){
 if(installed){btn.disabled=true;btn.textContent='ĐÃ CÀI ICON';say('Đã nhận xác nhận cài đặt. Mở QUẢN LÝ DỰ ÁN từ danh sách ứng dụng hoặc màn hình chính.');return;}
 if(standalone()) {btn.disabled=true;btn.textContent='ĐANG Ở CỬA SỔ ỨNG DỤNG';say('Bấm MỞ APP QLDA để mở ứng dụng dự án. Nếu tên cửa sổ là App Khối, hãy đóng cửa sổ và mở link cài trong Chrome/Edge thông thường.');return;}
 btn.disabled=!readySW;btn.textContent=window.qldaPrompt?'CÀI ICON QLDA':'HƯỚNG DẪN CÀI ICON';
 say(window.qldaPrompt?'Sẵn sàng cài icon QLDA độc lập.':'Nếu chưa có hộp cài, kiểm tra danh sách ứng dụng đã cài hoặc dùng hướng dẫn trình duyệt bên dưới.');
}
window.addEventListener('qlda-ready',render);
window.addEventListener('appinstalled',()=>{installed=true;window.qldaPrompt=null;render();});
btn.addEventListener('click',async()=>{
 if(standalone()||!readySW||installed)return;
 const e=window.qldaPrompt;
 if(!e){say('Mở menu trình duyệt để cài đặt. Nếu Chrome mở App Khối thay vì QLDA, dừng lại; không gỡ App Khối.');return;}
 window.qldaPrompt=null;btn.disabled=true;
 try{await e.prompt();const choice=await e.userChoice;if(installed)return;render();if(choice.outcome==='accepted')say('Đã chấp nhận yêu cầu cài. Kiểm tra danh sách ứng dụng để xác nhận QUẢN LÝ DỰ ÁN.');else say('Đã hủy cài đặt.');}catch(_){render();}
});
// Không chuyển sang URL Apps Script khi mở trang cài hoặc khi appinstalled.
// Chỉ mở Web App bằng liên kết do người dùng chủ động chọn, ở cửa sổ/tab riêng.
if('serviceWorker' in navigator){navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'}).then(async reg=>{try{await reg.update();}catch(_){}readySW=true;render();}).catch(()=>{say('Không đăng ký được Service Worker QLDA. Kiểm tra đường dẫn và HTTPS.');});}else{readySW=true;render();}
})();
