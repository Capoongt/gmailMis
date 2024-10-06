// ฟังก์ชันจัดการการส่งฟอร์ม
document.querySelector('.form-container').addEventListener('submit', function(e) {
    e.preventDefault(); // ป้องกันการโหลดหน้าใหม่

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const tableNumber = document.getElementById('table-number').value;

    // ส่งข้อมูลไปยังเซิร์ฟเวอร์
    fetch('http://localhost:3000/reserve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            table: tableNumber,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Reservation confirmed and email sent!') {
            // ปิดการคลิกที่โต๊ะที่ถูกเลือกแล้ว
            disableTable(tableNumber);

            // ล้างฟอร์ม
            this.reset();

            // ปิดฟอร์ม
            closeForm();

            alert('Reservation successful and email sent!');
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

// ฟังก์ชันปิดการใช้งานโต๊ะที่ถูกเลือก
function disableTable(tableNumber) {
    const tableItem = document.querySelector(`.table-item[data-table='${tableNumber}']`);
    
    if (tableItem) {
        tableItem.classList.remove('green');
        tableItem.classList.add('gray');
        tableItem.classList.add('disabled'); // เพิ่มคลาสเพื่อแสดงว่าไม่สามารถเลือกได้
        tableItem.removeEventListener('click', handleTableClick); // ปิดการคลิก
    }
}

// ฟังก์ชันสำหรับการคลิกโต๊ะ
function handleTableClick() {
    openForm(this.dataset.table);
}

// เปิดฟอร์มเมื่อมีการคลิกโต๊ะ
document.querySelectorAll('.table-item').forEach(item => {
    item.addEventListener('click', handleTableClick);
});

// ฟังก์ชันเปิดฟอร์ม
function openForm(tableNumber) {
    document.getElementById("form-popup").style.display = "block";
    document.getElementById("table-number").value = tableNumber;
}

// ฟังก์ชันปิดฟอร์ม
function closeForm() {
    document.getElementById("form-popup").style.display = "none";
}
