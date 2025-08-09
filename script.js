
let currentQRUrl = "";

function createQR() {
    let text = document.getElementById("qrText");
    text.value.trim();
    if (!text) {
        alert("Please enter URL");
        return;
    }
    currentQRUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(text);
    document.getElementById("qrImage");
    qrImage.src = currentQRUrl;
    document.getElementById("qrImage");
    qrImage.style.display = "block";
}

async function downloadQR() {
    if (!currentQRUrl) {
        alert("Please create a QR code first!");
        return;
    }
    try {
        const response = await fetch(currentQRUrl);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url); // Clean up
    } catch (err) {
        alert("Error downloading QR code");
        console.error(err);
    }
}
