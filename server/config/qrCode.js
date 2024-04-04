const fs = require('fs');
const qr = require('qrcode');

// Function to generate QR code
async function generateQRCode(data, filename) {
    try {
        // Generate QR code
        qr.toFile(filename,data,function(err){
            if (err) return console.log(err);
            else{
                console.log("qe code generated");
            }
        } )
    } catch (err) {
        console.error('Error generating QR code:', err);
    }
}

module.exports = generateQRCode;