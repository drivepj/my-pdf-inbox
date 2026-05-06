// ค้นหาฟังก์ชัน loadData ใน script.js แล้ววางทับส่วนการแสดงผล
if (!data || data.length === 0) {
    statusText.innerText = email ? `ไม่พบข้อมูลสำหรับ: ${email}` : "ยังไม่มีข้อมูลในระบบ";
    emptyState.classList.remove('hidden');
    listContent.classList.add('hidden');
    return;
}

emptyState.classList.add('hidden');
listContent.classList.remove('hidden');

// ปรับการสร้าง HTML ให้เข้ากับ UI ใหม่ (Modern)
listContent.innerHTML = data.map(item => `
    <div class="mail-item flex items-center gap-6 px-8 py-5 border-b border-gray-50 group cursor-pointer relative bg-white/40">
        <div class="flex items-center gap-4 min-w-[100px]">
            <input type="checkbox" class="w-4 h-4 rounded accent-blue-600">
            <i class="fa-regular fa-star text-gray-300 hover:text-yellow-400 transition-colors"></i>
        </div>
        
        <div class="flex flex-1 items-center gap-8 min-w-0">
            <span class="font-semibold text-gray-800 w-48 truncate text-sm tracking-tight">${item.sender}</span>
            <div class="flex-1 truncate">
                <span class="font-bold text-gray-900 text-sm">${item.subject || 'ไม่มีหัวข้อ'}</span>
                <span class="text-gray-400 text-sm font-normal mx-2">•</span>
                <span class="text-gray-500 text-sm font-normal italic">ไฟล์เอกสาร PDF พร้อมให้ตรวจสอบแล้ว</span>
            </div>
        </div>

        <div class="flex items-center gap-4 text-xs font-bold text-gray-400 group-hover:opacity-0 transition-opacity">
            <i class="fa-solid fa-paperclip text-blue-300"></i>
            <span>${new Date(item.created_at).toLocaleDateString('th-TH', {day:'numeric', month:'short'})}</span>
        </div>

        <div class="absolute right-8 hidden group-hover:flex items-center gap-2">
            <a href="${item.file_url}" target="_blank" class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 text-xs font-bold transition-all">
                <i class="fa-solid fa-eye text-[10px]"></i> VIEW PDF
            </a>
            <button onclick="deleteDoc(${item.id})" class="p-2.5 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all border border-red-100">
                <i class="fa-solid fa-trash-can text-xs"></i>
            </button>
        </div>
    </div>
`).join('');

// อัปเดตตัวเลขจำนวนข้อความ (ถ้ามี ID นี้ในหน้า HTML)
const countBadge = document.getElementById('result-count');
if (countBadge) countBadge.innerText = `${data.length} messages found`;