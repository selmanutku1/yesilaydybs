'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { QRScanner } from '../features/qr/QRScanner';
import { Maximize, Search, Bell } from 'lucide-react';
import { Button } from '../ui/Button';
import styles from './DashboardLayout.module.css';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'Yeni Arıza Bildirimi', desc: 'Üsküdar YEDAM - Masa #SN201', time: '10 dk önce', type: 'error' },
    { id: 2, title: 'Senkronizasyon Başarılı', desc: 'Google Sheets güncellendi.', time: '1 saat önce', type: 'success' },
    { id: 3, title: 'Zimmet Onayı', desc: 'Mehmet K. zimmetini onayladı.', time: '2 saat önce', type: 'info' },
  ];

  return (
    <div className={styles.layout}>
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <main className={`${styles.main} ${isSidebarCollapsed ? styles.collapsed : ''}`}>
        <header className={styles.header}>
          <h1 className={styles.title}>Yeşilay İdari İşler Demirbaş Bilgi Yönetim Sistemi (DBYS)</h1>
          <div className={styles.actions}>
            <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsScannerOpen(true)}
                title="QR Tara"
            >
              <Maximize size={18} />
              <span className={styles.actionText}>QR Tara</span>
            </Button>
            <div className={styles.notificationWrapper}>
                <div 
                    className={`${styles.iconBtn} ${isNotificationsOpen ? styles.iconBtnActive : ''}`}
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                >
                    <Bell size={20} />
                    <span className={styles.badge}>3</span>
                </div>

                {isNotificationsOpen && (
                    <div className={`${styles.notifDropdown} fade-in shadow-lg`}>
                        <div className={styles.notifHeader}>
                            <span>Bildirimler</span>
                            <button className={styles.markRead}>Tümünü Oku</button>
                        </div>
                        <div className={styles.notifList}>
                            {notifications.map(notif => (
                                <div key={notif.id} className={styles.notifItem}>
                                    <div className={`${styles.notifIcon} ${styles[notif.type]}`}></div>
                                    <div className={styles.notifContent}>
                                        <p className={styles.notifTitle}>{notif.title}</p>
                                        <p className={styles.notifDesc}>{notif.desc}</p>
                                        <p className={styles.notifTime}>{notif.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.notifFooter}>
                            Tüm Bildirimleri Gör
                        </div>
                    </div>
                )}
            </div>
          </div>
        </header>
        <div className={styles.content}>
          {children}
        </div>
      </main>

      {isScannerOpen && (
        <QRScanner 
          onScan={(text) => {
            console.log("Scanned:", text);
            setIsScannerOpen(false);
            // In a real app, redirect to the asset page
            if (text.includes('/asset/')) {
                const id = text.split('/asset/')[1];
                window.location.href = `/asset/${id}`;
            }
          }}
          onClose={() => setIsScannerOpen(false)}
        />
      )}
    </div>
  );
}
