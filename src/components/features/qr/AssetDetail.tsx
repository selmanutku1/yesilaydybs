'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { MapPin, User, Info, AlertTriangle, Calendar, ShieldCheck } from 'lucide-react';
import { FailureReportModal } from '../assets/FailureReportModal';
import styles from './AssetDetail.module.css';

interface AssetDetailProps {
  id: string;
}

export default function AssetDetail({ id }: AssetDetailProps) {
  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);
  // In a real app, we would fetch data here based on current session
  const isAuthorized = false; // Mocking unauthorized view for now
  
  const asset = {
    name: 'MacBook Pro 14"',
    brand: 'Apple',
    model: 'M2 Pro / 16GB / 512GB',
    serialNumber: 'SN-9021-XABC',
    status: 'Zimmetli',
    location: 'Merkez Bina / 2. Kat / Yazılım Ofisi',
    responsible: 'Ahmet Yılmaz',
    purchaseDate: '12.03.2024',
    warrantyLeft: '18 Ay',
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo}>Y</div>
          <p className={styles.logoLabel}>Yeşilay Demirbaş Bilgi Sistemi</p>
        </div>

        <div className={styles.content}>
          <div className={styles.mainInfo}>
            <div className={styles.categoryBadge}>BİLGİSAYAR</div>
            <h1 className={styles.assetName}>{asset.name}</h1>
            <p className={styles.assetBrand}>{asset.brand} - {asset.model}</p>
            <div className={`${styles.statusBadge} ${styles.assigned}`}>
              <ShieldCheck size={16} />
              <span>{asset.status}</span>
            </div>
          </div>

          <div className={styles.infoCard}>
             <div className={styles.detailItem}>
               <MapPin size={20} className={styles.icon} />
               <div>
                 <p className={styles.label}>KONUM</p>
                 <p className={styles.value}>{asset.location}</p>
               </div>
             </div>
             
             <div className={styles.detailItem}>
               <User size={20} className={styles.icon} />
               <div>
                 <p className={styles.label}>SORUMLU KİŞİ</p>
                 <p className={styles.value}>{asset.responsible}</p>
               </div>
             </div>
          </div>

          {!isAuthorized && (
            <div className={`${styles.authNotice} glass`}>
              <Info size={20} />
              <p>Daha fazla detay ve işlem geçmişi için giriş yapmanız gerekmektedir.</p>
              <Button variant="outline" size="sm" className={styles.authBtn}>Giriş Yap</Button>
            </div>
          )}

          {isAuthorized && (
            <div className={styles.authorizedContent}>
              <div className={styles.infoCard}>
                 <div className={styles.detailItem}>
                   <ShieldCheck size={20} className={styles.icon} />
                   <div>
                     <p className={styles.label}>SERİ NUMARASI</p>
                     <p className={styles.value}>{asset.serialNumber}</p>
                   </div>
                 </div>
                 <div className={styles.detailItem}>
                   <Calendar size={20} className={styles.icon} />
                   <div>
                     <p className={styles.label}>GARANTİ DURUMU</p>
                     <p className={styles.value}>{asset.purchaseDate} ({asset.warrantyLeft})</p>
                   </div>
                 </div>
              </div>
            </div>
          )}

          <div className={styles.actions}>
            <Button 
              variant="danger" 
              className={styles.failureBtn}
              onClick={() => setIsFailureModalOpen(true)}
            >
              <AlertTriangle size={20} />
              <span>Arıza Bildir</span>
            </Button>
          </div>
        </div>
      </div>
      
      <footer className={styles.footer}>
        © 2026 Yeşilay Demirbaş Yönetim Sistemi
      </footer>

      <FailureReportModal 
        isOpen={isFailureModalOpen}
        onClose={() => setIsFailureModalOpen(false)}
        assetName={asset.name}
      />
    </div>
  );
}
