import React from 'react';
import { X, Send, AlertCircle } from 'lucide-react';
import { Button } from '../../ui/Button';
import styles from './FailureReportModal.module.css';

interface FailureReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  assetName: string;
}

export const FailureReportModal: React.FC<FailureReportModalProps> = ({ isOpen, onClose, assetName }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={`${styles.modal} fade-in`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <AlertCircle size={20} color="var(--error)" />
            <h3 className={styles.title}>Arıza Bildirimi</h3>
          </div>
          <button className={styles.closeBtn} onClick={onClose}><X size={24} /></button>
        </div>
        
        <div className={styles.content}>
          <p className={styles.subtitle}><strong>{assetName}</strong> için arıza detaylarını belirtin.</p>
          
          <div className={styles.formField}>
            <label className={styles.label}>Arıza Türü</label>
            <select className={styles.select}>
              <option>Donanımsal Arıza</option>
              <option>Yazılımsal Hata</option>
              <option>Fiziksel Hasar</option>
              <option>Bakım Talebi</option>
              <option>Diğer</option>
            </select>
          </div>

          <div className={styles.formField}>
            <label className={styles.label}>Detaylı Açıklama</label>
            <textarea className={styles.textarea} placeholder="Lütfen sorunu kısaca açıklayın..."></textarea>
          </div>

          <div className={styles.priorityGroup}>
              <label className={styles.label}>Öncelik</label>
              <div className={styles.priorityOptions}>
                  <button className={styles.priorityBtn}>Düşük</button>
                  <button className={`${styles.priorityBtn} ${styles.activePriority}`}>Normal</button>
                  <button className={styles.priorityBtn}>Yüksek</button>
              </div>
          </div>
        </div>

        <div className={styles.footer}>
          <Button onClick={onClose} className={styles.submitBtn}>
            <Send size={18} />
            Raporu Gönder
          </Button>
        </div>
      </div>
    </div>
  );
};
