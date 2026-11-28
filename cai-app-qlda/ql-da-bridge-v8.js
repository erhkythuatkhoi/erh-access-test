PATCH BC02 CHO ICON QLDA / PWA – 28/11/2026

MỤC ĐÍCH: sửa bảng Báo cáo công việc trên giao diện GitHub Pages mà icon QLDA V8 đang mở; không phải bản /exec của Google Apps Script.

CÁCH THAY:
1. Mở file qlda-ui-v8.html HIỆN ĐANG CHẠY trong repo/bộ cài icon QLDA. Không lấy bản HTML cũ để ghi đè các chức năng vừa cập nhật.
2. Tìm thẻ </head> và dán TOÀN BỘ đoạn <style> bên dưới ngay trước </head>.
3. Nếu file đang có một khối style id="erh-bc02-mobile-table-scroll-r2" thì thay khối đó, không thêm trùng.
4. Lưu/Commit lên nhánh GitHub Pages đang được icon sử dụng.
5. Mở trực tiếp URL qlda-ui-v8.html trên Chrome điện thoại (thêm ?v=20261128-bc02-scroll-r3) để xem bảng đã cuộn ngang chưa.
6. Khi Chrome đã hiện đúng nhưng icon còn cũ, kiểm tra file pwa-start.html/launcher-config.js và cập nhật cache service worker của bộ cài QLDA; thử Xóa bộ nhớ đệm (KHÔNG XÓA DỮ LIỆU) rồi mở lại icon.

LƯU Ý: Không thay Index.html /exec lần nữa; chỉ thay giao diện icon. Không tự ý sửa sw.js nếu chưa kiểm tra đúng service worker.

--- BẮT ĐẦU MÃ DÁN ---
<style id="erh-bc02-mobile-table-scroll-r2">
@media screen and (max-width: 900px) {
  /* Keep all original table columns, widths and headings. Never squeeze the table into 390px. */
  #application #page-reportwork #bc02-report-tables,
  #application #page-reportwork #bc02-report-tables > .bc02-part {
    box-sizing: border-box !important;
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
  }
  #application #page-reportwork .bc02-parthead {
    flex-wrap: wrap !important;
    gap: 4px 8px !important;
  }
  /* The hint sits outside the scrolling table and is not part of the printout. */
  #application #page-reportwork .bc02-parthead::after {
    content: "↔ Vuốt ngang để xem đủ các cột";
    flex: 0 0 100%;
    color: #577b96;
    font-size: 11px;
    font-weight: 600;
    line-height: 1.35;
  }
  #application #page-reportwork .bc02-tablewrap {
    box-sizing: border-box !important;
    display: block !important;
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
    scrollbar-width: auto;
    scrollbar-color: #6f9fbd #e2edf5;
    padding-bottom: 3px;
  }
  /* Provide a visible draggable scrollbar where the browser supports styling. */
  #application #page-reportwork .bc02-tablewrap::-webkit-scrollbar { height: 12px; }
  #application #page-reportwork .bc02-tablewrap::-webkit-scrollbar-track {
    background: #e2edf5;
    border-radius: 8px;
  }
  #application #page-reportwork .bc02-tablewrap::-webkit-scrollbar-thumb {
    background: #729fb9;
    border: 2px solid #e2edf5;
    border-radius: 8px;
  }
  #application #page-reportwork .bc02-table {
    display: table !important;
    border-collapse: collapse !important;
    table-layout: fixed !important;
    width: 1400px !important;
    min-width: 1400px !important;
    max-width: none !important;
    font-size: 12px !important;
  }
  #application #page-reportwork .bc02-table colgroup { display: table-column-group !important; }
  #application #page-reportwork .bc02-table thead { display: table-header-group !important; }
  #application #page-reportwork .bc02-table tbody { display: table-row-group !important; }
  #application #page-reportwork .bc02-table tr { display: table-row !important; }
  #application #page-reportwork .bc02-table th,
  #application #page-reportwork .bc02-table td {
    box-sizing: border-box !important;
    padding: 8px 6px !important;
    min-width: 0 !important;
    font-size: 12px !important;
    line-height: 1.45 !important;
    word-break: normal !important;
    overflow-wrap: break-word !important;
    white-space: normal !important;
    vertical-align: top !important;
  }
  #application #page-reportwork .bc02-table th {
    text-align: center !important;
    font-weight: 800 !important;
    background: #f7fafc !important;
  }
  /* Original job name was forced into 1 clipped line; show its full content on mobile. */
  #application #page-reportwork .bc02-table td.bc02-content {
    white-space: normal !important;
    overflow: visible !important;
    text-overflow: clip !important;
    overflow-wrap: break-word !important;
    font-size: 12px !important;
  }
  #application #page-reportwork .bc02-table td.bc02-person,
  #application #page-reportwork .bc02-table td.bc02-date {
    white-space: normal !important;
    overflow-wrap: break-word !important;
    font-size: 12px !important;
  }
  #application #page-reportwork .bc02-table .bc02-plan-choice,
  #application #page-reportwork .bc02-table .bc02-plan-saved {
    font-size: 12px !important;
    white-space: normal !important;
  }
  #application #page-reportwork .bc02-table .bc02-plan-choice input[type="checkbox"] {
    width: 16px !important;
    height: 16px !important;
    flex-basis: 16px !important;
  }
}
</style>
--- KẾT THÚC MÃ DÁN ---
