'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { MapPin, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { AddLocationModal } from '@/components/features/locations/AddLocationModal';
import { LocationDetailModal } from '@/components/features/locations/LocationDetailModal';

export default function LocationsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  const locations = [
    { name: 'Yeşilay Genel Merkez', type: 'Genel Merkez', city: 'İstanbul', district: 'Sepetçiler Kasrı', assets: 1240 },
    { name: 'YEDAM Üsküdar', type: 'YEDAM', city: 'İstanbul', district: 'Üsküdar', assets: 45 },
    { name: 'YEDAM Çankaya', type: 'YEDAM', city: 'Ankara', district: 'Çankaya', assets: 32 },
    { name: 'Yeşilay İzmir Şubesi', type: 'Şube', city: 'İzmir', district: 'Konak', assets: 88 },
    { name: 'YEDAM Bursa', type: 'YEDAM', city: 'Bursa', district: 'Osmangazi', assets: 56 },
  ];

  const handleOpenDetail = (loc: any) => {
    setSelectedLocation(loc);
    setIsDetailModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Lokasyonlar</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>Bina ve oda bazlı yerleşimleri yönetin.</p>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)}><Plus size={20} /> Yeni Lokasyon Ekle</Button>
        </div>

        <div className="card" style={{ padding: '1rem', marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
             <div style={{ flex: 1, minWidth: '200px' }}>
                <Input placeholder="Lokasyon veya Birim ara..." icon={<Search size={18} />} />
             </div>
             <select className="select" style={{ minWidth: '150px', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                 <option value="">Tüm Şehirler</option>
                 <option>İstanbul</option>
                 <option>Ankara</option>
                 <option>İzmir</option>
                 <option>Antalya</option>
                 <option>Bursa</option>
             </select>
             <select className="select" style={{ minWidth: '150px', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                 <option value="">Tüm Türler</option>
                 <option>YEDAM</option>
                 <option>Şube</option>
                 <option>Genel Merkez</option>
                 <option>Danışmanlık Merkezi</option>
             </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {locations.map((loc) => (
            <div 
                key={loc.name} 
                className="card" 
                style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                onClick={() => handleOpenDetail(loc)}
            >
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.75rem', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '12px' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>{loc.name}</h3>
                    <span style={{ fontSize: '0.65rem', padding: '1px 6px', backgroundColor: 'var(--background)', borderRadius: '4px', border: '1px solid var(--border)', color: 'var(--muted)' }}>{loc.type}</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginBottom: '0.5rem' }}>{loc.city} / {loc.district}</p>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>{loc.assets} Demirbaş</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <AddLocationModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
        />

        <LocationDetailModal 
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          location={selectedLocation}
        />
      </div>
    </DashboardLayout>
  );
}
