import React from 'react';
import { X, Package, Search } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import styles from './LocationDetailModal.module.css';

interface LocationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: any;
}

export const LocationDetailModal: React.FC<LocationDetailModalProps> = ({ isOpen, onClose, location }) => {
  if (!isOpen || !location) return null;

  const mockAssets = [
    { name: 'MacBook Pro 14"', category: 'Bilgisayar', status: 'Zimmetli' },
    { name: 'Dell Monitor', category: 'Çevre Birimi', status: 'Aktif' },
    { name: 'Ofis Koltuğu', category: 'Mobilya', status: 'Aktif' },
  ];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={`${styles.modal} fade-in`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <h3 className={styles.title}>{location.name}</h3>
            <p className={styles.subtitle}>{location.sub}</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose}><X size={20} /></button>
        </div>
        
        <div className={styles.content}>
          <div className={styles.stats}>
              <div className={styles.statCard}>
                  <span className={styles.statValue}>{location.assets}</span>
                  <span className={styles.statLabel}>Toplam Demirbaş</span>
              </div>
          </div>

          <div className={styles.assetListHeader}>
              <h4 className={styles.sectionTitle}>Demirbaşlar</h4>
              <Input placeholder="Ara..." icon={<Search size={14} />} />
          </div>

          <div className={styles.assetList}>
            {mockAssets.map((asset, idx) => (
              <div key={idx} className={styles.assetItem}>
                <div className={styles.assetIcon}><Package size={18} /></div>
                <div className={styles.assetInfo}>
                  <p className={styles.assetName}>{asset.name}</p>
                  <p className={styles.assetCategory}>{asset.category}</p>
                </div>
                <span className={styles.statusBadge}>{asset.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <Button variant="outline" onClick={onClose} className={styles.footerBtn}>Kapat</Button>
        </div>
      </div>
    </div>
  );
};
