import React from 'react';
import { X, Download, Share2 } from 'lucide-react';
import { Button } from '../../ui/Button';
import styles from './QRModal.module.css';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrDataUrl: string;
  assetName: string;
}

export const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose, qrDataUrl, assetName }) => {
  if (!isOpen) return null;

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `${assetName}-qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={`${styles.modal} fade-in`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>Demirbaş QR Kodu</h3>
          <button className={styles.closeBtn} onClick={onClose}><X size={20} /></button>
        </div>
        
        <div className={styles.content}>
          <p className={styles.assetName}>{assetName}</p>
          <div className={styles.qrWrapper}>
            <img src={qrDataUrl} alt="QR Code" className={styles.qrImage} />
          </div>
          <p className={styles.instruction}>
            Bu kodu çıktı alıp demirbaşın üzerine yapıştırabilirsiniz.
          </p>
        </div>

        <div className={styles.footer}>
          <Button variant="outline" onClick={onClose} className={styles.footerBtn}>Kapat</Button>
          <Button onClick={downloadQR} className={styles.footerBtn}>
            <Download size={18} />
            İndir (PNG)
          </Button>
        </div>
      </div>
    </div>
  );
};
