'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Package, AlertCircle, CheckCircle2, History, Plus } from 'lucide-react';
import { AddAssetModal } from '@/components/features/assets/AddAssetModal';
import styles from './Dashboard.module.css';

export default function DashboardPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const stats = [
    { label: 'Toplam Demirbaş', value: '1,284', icon: <Package size={24} />, color: 'var(--primary)' },
    { label: 'Zimmetli', value: '842', icon: <CheckCircle2 size={24} />, color: '#3B82F6' },
    { label: 'Arızalı', value: '12', icon: <AlertCircle size={24} />, color: 'var(--error)' },
    { label: 'Son İşlemler', value: '48', icon: <History size={24} />, color: 'var(--warning)' },
  ];

  return (
    <DashboardLayout>
      <div className="fade-in">
        <div className={styles.header}>
          <div>
            <h2 className={styles.pageTitle}>Genel Bakış</h2>
            <p className={styles.pageSubtitle}>Sistemdeki güncel envanter durumu ve son aktiviteler.</p>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus size={20} />
            <span>Yeni Demirbaş Ekle</span>
          </Button>
        </div>

        <div className={styles.statsGrid}>
          {stats.map((stat, idx) => (
            <div key={idx} className={`${styles.statCard} card`}>
              <div className={styles.statIcon} style={{ backgroundColor: stat.color + '15', color: stat.color }}>
                {stat.icon}
              </div>
              <div className={styles.statInfo}>
                <p className={styles.statLabel}>{stat.label}</p>
                <h3 className={styles.statValue}>{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.sectionsGrid}>
          <div className={`${styles.sectionCard} card`}>
            <h3 className={styles.sectionTitle}>Son Arıza Bildirimleri</h3>
            <div className={styles.list}>
              {[
                { name: 'Yönetici Masası - #SN402', detail: 'Çekmece Kilidi Arızalı / Oda 102' },
                { name: 'Toplantı Sandalyesi - #SN881', detail: 'Ayak Mekanizması Kırık / Toplantı Odası B' },
                { name: 'Kütüphane Rafı - #SN112', detail: 'Raf Devrilme Riski / Arşiv Birimi' }
              ].map((item, i) => (
                <div key={i} className={styles.listItem}>
                  <div className={styles.itemIcon}><AlertCircle size={18} /></div>
                  <div className={styles.itemContent}>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemDetail}>{item.detail}</p>
                  </div>
                  <span className={`${styles.badge} ${styles.badgeWarning}`}>Beklemede</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.sectionCard} card`}>
            <h3 className={styles.sectionTitle}>Kategori Dağılımı</h3>
            <div className={styles.chartPlaceholder}>
               {/* Recharts will go here */}
               <div className={styles.placeholderText}>Grafik Yükleniyor...</div>
            </div>
          </div>
        </div>

        <AddAssetModal 
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
}
