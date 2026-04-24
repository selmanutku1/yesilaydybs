import React from 'react';
import { X, Send, AlertCircle, Phone } from 'lucide-react';
import { Button } from '../../ui/Button';
import styles from './EmergencyRequestModal.module.css';

interface EmergencyRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyRequestModal: React.FC<EmergencyRequestModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={`${styles.modal} fade-in`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
            <div className={styles.titleWrapper}>
                <AlertCircle size={24} color="#EF4444" />
                <h3 className={styles.title}>Acil Destek Talebi</h3>
            </div>
          <button className={styles.closeBtn} onClick={onClose}><X size={20} /></button>
        </div>
        
        <div className={styles.content}>
          <p className={styles.warning}>Acil fiziksel müdahale, güvenlik riski veya ciddi hasar durumları için bu formu kullanın. İdari İşler ekibine anlık bildirim gönderilecektir.</p>
          
          <div className={styles.form}>
            <div className={styles.field}>
                <label className={styles.label}>Aciliyet Sebebi</label>
                <select className={styles.select}>
                    <option>Ciddi Fiziksel Hasar / Kırılma</option>
                    <option>Güvenlik Riski (Kapı/Kilit/Cam)</option>
                    <option>Su Baskını / Tesisat Sorunu</option>
                    <option>Yaralanmaya Sebep Olabilecek Durum</option>
                </select>
            </div>
            
            <div className={styles.field}>
                <label className={styles.label}>Olay Özeti</label>
                <textarea className={styles.textarea} placeholder="Durumu kısaca açıklayın..."></textarea>
            </div>

            <div className={styles.field}>
                <label className={styles.label}>İletişim Numarası</label>
                <div className={styles.phoneInput}>
                    <Phone size={18} />
                    <input type="text" placeholder="05XX XXX XX XX" />
                </div>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <Button variant="outline" onClick={onClose} className={styles.footerBtn}>Vazgeç</Button>
          <Button variant="danger" onClick={onClose} className={styles.footerBtn}>
            <Send size={18} />
            Acil Bildirimi Gönder
          </Button>
        </div>
      </div>
    </div>
  );
};
