import React from 'react';
import { X, FileUp, Download, FileSpreadsheet, Info } from 'lucide-react';
import { Button } from '../../ui/Button';
import styles from './ImportCSVModal.module.css';

interface ImportCSVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImportCSVModal: React.FC<ImportCSVModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownloadTemplate = () => {
    const headers = "Demirbaş Adı,Marka,Model,Kategori,Lokasyon,Seri No\n";
    const blob = new Blob([headers], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'demirbas_sablonu.csv';
    a.click();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={`${styles.modal} fade-in`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>CSV İçe Aktar</h3>
          <button className={styles.closeBtn} onClick={onClose}><X size={20} /></button>
        </div>
        
        <div className={styles.content}>
          <div className={styles.templateSection}>
              <div className={styles.templateInfo}>
                  <FileSpreadsheet size={24} color="var(--primary)" />
                  <div>
                      <p className={styles.templateTitle}>Hazır Şablon Kullanın</p>
                      <p className={styles.templateDesc}>Verilerinizi doğru formatta yüklemek için şablonu indirin.</p>
                  </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleDownloadTemplate}>
                  <Download size={16} /> Şablonu İndir
              </Button>
          </div>

          <div className={styles.uploadArea}>
              <FileUp size={48} className={styles.uploadIcon} />
              <p className={styles.uploadText}>Dosyayı buraya bırakın veya seçmek için tıklayın</p>
              <p className={styles.uploadHint}>Sadece .csv uzantılı dosyalar desteklenir (Maks. 10MB)</p>
          </div>

          <div className={styles.infoBox}>
              <Info size={18} />
              <p>İçe aktarılan demirbaşlar için otomatik olarak QR kod üretilecektir.</p>
          </div>
        </div>

        <div className={styles.footer}>
          <Button variant="outline" onClick={onClose}>İptal</Button>
          <Button onClick={onClose} disabled>Yüklemeyi Başlat</Button>
        </div>
      </div>
    </div>
  );
};
