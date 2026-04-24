import React from 'react';
import { X, UserPlus, Save } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import styles from './AddUserModal.module.css';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={`${styles.modal} fade-in`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>Yeni Kullanıcı Tanımla</h3>
          <button className={styles.closeBtn} onClick={onClose}><X size={20} /></button>
        </div>
        
        <div className={styles.content}>
          <div className={styles.form}>
            <div className={styles.grid}>
                <Input label="Ad Soyad" placeholder="Örn: Selman Utku" />
                <Input label="Kullanıcı Adı" placeholder="selman.utku" />
            </div>
            <Input label="E-posta" placeholder="ornek@yesilay.org.tr" />
            <div className={styles.grid}>
                <Input label="Şifre" type="password" placeholder="********" />
                <div className={styles.field}>
                    <label className={styles.label}>Rol</label>
                    <select className={styles.select}>
                        <option>Görüntüleyici</option>
                        <option>Editör</option>
                        <option>Yönetici</option>
                        <option>Süper Admin</option>
                    </select>
                </div>
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Bağlı Olduğu Birim</label>
                <select className={styles.select}>
                    <option>Yeşilay Genel Merkez</option>
                    <option>YEDAM Üsküdar</option>
                    <option>YEDAM Çankaya</option>
                    <option>İzmir Şubesi</option>
                </select>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <Button variant="outline" onClick={onClose} className={styles.footerBtn}>İptal</Button>
          <Button onClick={onClose} className={styles.footerBtn}>
            <UserPlus size={18} />
            Kullanıcıyı Kaydet
          </Button>
        </div>
      </div>
    </div>
  );
};
