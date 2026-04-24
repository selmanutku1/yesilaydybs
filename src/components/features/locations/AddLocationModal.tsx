import React from 'react';
import { X, MapPin, Save } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import styles from './AddLocationModal.module.css';

interface AddLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

import { TURKEY_DATA } from '@/utils/turkeyData';

export const AddLocationModal: React.FC<AddLocationModalProps> = ({ isOpen, onClose }) => {
  const [selectedCity, setSelectedCity] = React.useState('');
  
  if (!isOpen) return null;

  const cityList = Object.keys(TURKEY_DATA).sort((a, b) => a.localeCompare(b, 'tr'));

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={`${styles.modal} fade-in`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>Yeni Lokasyon Ekle</h3>
          <button className={styles.closeBtn} onClick={onClose}><X size={20} /></button>
        </div>
        
        <div className={styles.content}>
          <div className={styles.form}>
            <div className={styles.field}>
                <label className={styles.label}>Birim Türü</label>
                <select className={styles.select}>
                    <option>YEDAM (Danışmanlık Merkezi)</option>
                    <option>Yeşilay Şubesi</option>
                    <option>Bölge Başkalığı</option>
                    <option>Genel Merkez / Ofis</option>
                </select>
            </div>
            <Input label="Birim Adı" placeholder="Örn: Üsküdar YEDAM" />
            <div className={styles.grid}>
                <div className={styles.field}>
                    <label className={styles.label}>Şehir</label>
                    <select 
                        className={styles.select} 
                        value={selectedCity} 
                        onChange={(e) => setSelectedCity(e.target.value)}
                    >
                        <option value="">Şehir Seçin</option>
                        {cityList.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>İlçe</label>
                    <select className={styles.select} disabled={!selectedCity}>
                        <option value="">İlçe Seçin</option>
                        {selectedCity && TURKEY_DATA[selectedCity].map(district => (
                            <option key={district} value={district}>{district}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Tam Adres</label>
                <textarea className={styles.textarea} placeholder="Mahalle, Sokak, No..."></textarea>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <Button variant="outline" onClick={onClose} className={styles.footerBtn}>İptal</Button>
          <Button onClick={onClose} className={styles.footerBtn}>
            <Save size={18} />
            Lokasyonu Kaydet
          </Button>
        </div>
      </div>
    </div>
  );
};
