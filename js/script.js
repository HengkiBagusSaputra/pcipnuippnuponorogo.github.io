let img = new Image();
let imgX = 0, imgY = 0;
let isDragging = false;

// Fungsi untuk menggambar ulang gambar dan twibbon pada canvas
function redrawCanvas() {
    const canvas = document.getElementById('resultCanvas');
    const ctx = canvas.getContext('2d');
    const twibbonSelect = document.getElementById('twibbonSelect').value;
    const twibbon = new Image();
    twibbon.src = twibbonSelect;

    twibbon.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, imgX, imgY, canvas.width, canvas.height);
        ctx.drawImage(twibbon, 0, 0, canvas.width, canvas.height);
        document.getElementById('downloadLink').href = canvas.toDataURL('image/png');
    };
}

// Event listener untuk form submit
document.getElementById('twibbonForm').addEventListener('submit', function(e) {
    e.preventDefault();
    redrawCanvas();
});

// Event listener untuk upload gambar
document.getElementById('imageUpload').addEventListener('change', function(e) {
    const canvas = document.getElementById('resultCanvas');
    const ctx = canvas.getContext('2d');
    const imageUpload = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        img.src = event.target.result;
        img.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, imgX, imgY, canvas.width, canvas.height);
        };
    };

    reader.readAsDataURL(imageUpload);
});

// Event listener untuk mulai menggeser gambar
document.getElementById('resultCanvas').addEventListener('mousedown', function(e) {
    isDragging = true;
});

// Event listener untuk menggeser gambar saat mouse bergerak
document.getElementById('resultCanvas').addEventListener('mousemove', function(e) {
    if (isDragging) {
        const canvas = document.getElementById('resultCanvas');
        imgX = e.offsetX - canvas.width / 2;
        imgY = e.offsetY - canvas.height / 2;
        redrawCanvas();
    }
});

// Event listener untuk berhenti menggeser gambar
document.getElementById('resultCanvas').addEventListener('mouseup', function() {
    isDragging = false;
});
