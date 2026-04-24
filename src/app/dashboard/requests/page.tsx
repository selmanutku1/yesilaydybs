'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { AlertCircle, CheckCircle, Clock, Search, Activity } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { EmergencyRequestModal } from '@/components/features/requests/EmergencyRequestModal';

export default function RequestsPage() {
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);

  const requests = [
    { id: 'T-1001', asset: 'Yönetici Masası (Deri Kaplama)', user: 'Ahmet Yılmaz', type: 'Onarım', status: 'Açık', date: '24.04.2024' },
    { id: 'T-1002', asset: 'Toplantı Sandalyesi (Krom Ayak)', user: 'Mehmet Demir', type: 'Yedek Parça', status: 'İşlemde', date: '23.04.2024' },
    { id: 'T-1003', asset: 'Atatürk Tablosu (Altın Çerçeve)', user: 'Ayşe Kaya', type: 'Yenileme', status: 'Çözüldü', date: '22.04.2024' },
  ];

  return (
    <DashboardLayout>
      <div className="fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Arıza Talepleri</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>Bakım ve onarım süreçlerini takip edin.</p>
          </div>
          <Button variant="danger" onClick={() => setIsEmergencyModalOpen(true)}>
            <AlertCircle size={20} /> Acil Destek Talebi
          </Button>
        </div>

        <div className="card" style={{ padding: '1rem', marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
             <Input placeholder="Talep ID veya Demirbaş ara..." icon={<Search size={18} />} />
        </div>

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: 'var(--background)' }}>
              <tr>
                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.75rem', color: 'var(--muted)' }}>TALEP ID</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.75rem', color: 'var(--muted)' }}>DEMİRBAŞ</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.75rem', color: 'var(--muted)' }}>SORUMLU</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.75rem', color: 'var(--muted)' }}>DURUM</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.75rem', color: 'var(--muted)' }}>TARİH</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--primary)' }}>{req.id}</td>
                  <td style={{ padding: '1rem' }}>{req.asset}</td>
                  <td style={{ padding: '1rem' }}>{req.user}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                      {req.status === 'Açık' && <Clock size={16} color="#EF4444" />}
                      {req.status === 'İşlemde' && <Activity size={16} color="#F59E0B" />}
                      {req.status === 'Çözüldü' && <CheckCircle size={16} color="#10B981" />}
                      {req.status}
                    </div>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--muted)' }}>{req.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <EmergencyRequestModal 
          isOpen={isEmergencyModalOpen}
          onClose={() => setIsEmergencyModalOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
}
