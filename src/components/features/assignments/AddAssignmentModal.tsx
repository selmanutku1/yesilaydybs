import React from 'react';
import { X, UserPlus, Calendar } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import styles from './AddAssignmentModal.module.css';

interface AddAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddAssignmentModal: React.FC<AddAssignmentModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={`${styles.modal} fade-in`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>Yeni Zimmet Kaydı</h3>
          <button className={styles.closeBtn} onClick={onClose}><X size={20} /></button>
        </div>
        
        <div className={styles.content}>
          <div className={styles.form}>
            <Input label="Demirbaş Seçin" placeholder="Demirbaş adı veya SN ara..." />
            <Input label="Zimmetlenecek Kişi" placeholder="Personel adı ara..." />
            <Input label="Zimmet Tarihi" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
            <div className={styles.field}>
                <label className={styles.label}>Zimmet Notu</label>
                <textarea className={styles.textarea} placeholder="Teslimat notları..."></textarea>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <Button variant="outline" onClick={onClose} className={styles.footerBtn}>İptal</Button>
          <Button onClick={onClose} className={styles.footerBtn}>
            <UserPlus size={18} />
            Zimmet Kaydını Tamamla
          </Button>
        </div>
      </div>
    </div>
  );
};
