'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, Filter, Download, QrCode, Edit, Trash2, UserPlus, FileUp } from 'lucide-react';
import { QRModal } from '@/components/features/assets/QRModal';
import { EditAssetModal } from '@/components/features/assets/EditAssetModal';
import { AddAssetModal } from '@/components/features/assets/AddAssetModal';
import { ImportCSVModal } from '@/components/features/assets/ImportCSVModal';
import styles from './Assets.module.css';

const MOCK_ASSETS = [
  { id: '1', name: 'Ergonomik Çalışma Masası', category: 'Mobilya', brand: 'Nurus', status: 'Zimmetli', location: 'Merkez Bina / Kat 2', qrId: 'qr-123' },
  { id: '2', name: 'Makam Koltuğu (Deri)', category: 'Mobilya', brand: 'Bürosit', status: 'Aktif', location: 'Yönetim Ofisi', qrId: 'qr-456' },
  { id: '3', name: 'Atatürk Portresi (Yağlı Boya)', category: 'Dekorasyon', brand: 'Sanatçı Eseri', status: 'Aktif', location: 'Giriş Holü', qrId: 'qr-789' },
  { id: '4', name: 'Toplantı Masası (12 Kişilik)', category: 'Mobilya', brand: 'Koleksiyon', status: 'Arızalı', location: 'Toplantı Odası A', qrId: 'qr-101' },
];

export default function AssetsPage() {
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [mockQrUrl, setMockQrUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredAssets = MOCK_ASSETS.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          asset.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || asset.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportExcel = () => {
    const headers = "Demirbaş Adı,Kategori,Marka,Durum,Lokasyon\n";
    const rows = filteredAssets.map(a => `${a.name},${a.category},${a.brand},${a.status},${a.location}`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'demirbas_listesi.csv';
    a.click();
  };

  const handleShowQR = (asset: any) => {
    setMockQrUrl("https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://yesilay.org.tr/asset/" + asset.qrId);
    setSelectedAsset(asset);
    setIsQRModalOpen(true);
  };

  const handleEdit = (asset: any) => {
    setSelectedAsset(asset);
    setIsEditModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="fade-in">
        <div className={styles.header}>
          <div>
            <h2 className={styles.pageTitle}>Demirbaş Listesi</h2>
            <p className={styles.pageSubtitle}>Tüm kayıtlı demirbaşları yönetin ve QR kodlarını dışa aktarın.</p>
          </div>
          <div className={styles.actions}>
            <Button variant="outline" onClick={handleExportExcel} title="Listeyi Excel (CSV) olarak indir">
              <Download size={18} /> Excel'e Aktar
            </Button>
            <Button variant="outline" onClick={() => setIsImportModalOpen(true)}>
              <FileUp size={18} /> CSV İçe Aktar
            </Button>
            <Button onClick={() => setIsAddModalOpen(true)}>Demirbaş Ekle</Button>
          </div>
        </div>

        <div className={`${styles.filterBar} card`}>
          <Input 
             placeholder="İsim, Marka veya Seri No ile ara..." 
             icon={<Search size={18} />} 
             className={styles.searchInput}
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className={styles.filterButtons}>
            <select 
              className={styles.filterSelect}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">Tüm Durumlar</option>
              <option value="Aktif">Aktif</option>
              <option value="Zimmetli">Zimmetli</option>
              <option value="Arızalı">Arızalı</option>
            </select>
            <Button variant="outline" size="sm"><Filter size={16} /> Filtrele</Button>
          </div>
        </div>

        <div className={`${styles.tableWrapper} card`}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Demirbaş Bilgisi</th>
                <th>Kategori</th>
                <th>Lokasyon</th>
                <th>Durum</th>
                <th>QR</th>
                <th className={styles.actionCol}>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset) => (
                <tr key={asset.id}>
                  <td>
                    <div className={styles.assetCell}>
                      <span className={styles.assetName}>{asset.name}</span>
                      <span className={styles.assetBrand}>{asset.brand}</span>
                    </div>
                  </td>
                  <td>{asset.category}</td>
                  <td>{asset.location}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${asset.status === 'Arızalı' ? styles.broken : styles.active}`}>
                      {asset.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className={styles.qrBtn}
                      onClick={() => handleShowQR(asset)}
                      title="QR Kod Görüntüle"
                    >
                      <QrCode size={18} />
                    </button>
                  </td>
                  <td className={styles.actionCol}>
                    <div className={styles.actionButtons}>
                      <button 
                        className={styles.actionBtn} 
                        title="Düzenle"
                        onClick={() => handleEdit(asset)}
                      >
                        <Edit size={16} />
                      </button>
                      <button className={styles.actionBtn} title="Zimmetle"><UserPlus size={16} /></button>
                      <button className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Sil"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredAssets.length === 0 && (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--muted)' }}>
              Aranan kriterlere uygun demirbaş bulunamadı.
            </div>
          )}
        </div>

        <QRModal 
          isOpen={isQRModalOpen}
          onClose={() => setIsQRModalOpen(false)}
          qrDataUrl={mockQrUrl}
          assetName={selectedAsset?.name || ''}
        />

        <EditAssetModal 
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          asset={selectedAsset}
        />

        <AddAssetModal 
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />

        <ImportCSVModal 
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
}
