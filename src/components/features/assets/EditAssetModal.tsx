import React from 'react';
import { X, Save } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import styles from './EditAssetModal.module.css';

interface EditAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: any;
}

export const EditAssetModal: React.FC<EditAssetModalProps> = ({ isOpen, onClose, asset }) => {
  if (!isOpen || !asset) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={`${styles.modal} fade-in`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>Demirbaş Düzenle</h3>
          <button className={styles.closeBtn} onClick={onClose}><X size={20} /></button>
        </div>
        
        <div className={styles.content}>
          <div className={styles.formGrid}>
            <Input label="Demirbaş Adı" defaultValue={asset.name} />
            <Input label="Marka" defaultValue={asset.brand} />
            <Input label="Kategori" defaultValue={asset.category} />
            <Input label="Lokasyon" defaultValue={asset.location} />
            <Input label="Seri Numarası" defaultValue={asset.qrId} />
            <div className={styles.statusGroup}>
                <label className={styles.label}>Durum</label>
                <select className={styles.select} defaultValue={asset.status}>
                    <option value="Aktif">Aktif</option>
                    <option value="Zimmetli">Zimmetli</option>
                    <option value="Arızalı">Arızalı</option>
                    <option value="Hurda">Hurda</option>
                </select>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <Button variant="outline" onClick={onClose} className={styles.footerBtn}>İptal</Button>
          <Button onClick={onClose} className={styles.footerBtn}>
            <Save size={18} />
            Değişiklikleri Kaydet
          </Button>
        </div>
      </div>
    </div>
  );
};
