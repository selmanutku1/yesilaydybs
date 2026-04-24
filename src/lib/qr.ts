import QRCode from 'qrcode';

export async function generateQRCode(url: string): Promise<string> {
  try {
    const qrDataUrl = await QRCode.toDataURL(url, {
      width: 400,
      margin: 2,
      color: {
        dark: '#007A33', // Yeşilay Green
        light: '#FFFFFF',
      },
    });
    return qrDataUrl;
  } catch (err) {
    console.error('QR code generation failed:', err);
    throw new Error('Failed to generate QR code');
  }
}
