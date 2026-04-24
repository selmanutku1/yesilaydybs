'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Users, UserCheck, Calendar, ArrowRight, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { AddAssignmentModal } from '@/components/features/assignments/AddAssignmentModal';

export default function AssignmentsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const assignments = [
    { asset: 'MacBook Pro 14"', user: 'Ahmet Yılmaz', date: '12.03.2024', status: 'Aktif' },
    { asset: 'Dell UltraSharp', user: 'Mehmet Demir', date: '05.02.2024', status: 'Aktif' },
    { asset: 'iPhone 15 Pro', user: 'Ayşe Kaya', date: '20.04.2024', status: 'Beklemede' },
  ];

  return (
    <DashboardLayout>
      <div className="fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Zimmetler</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>Emanet edilen demirbaşları ve sorumluları takip edin.</p>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)}><UserCheck size={20} /> Yeni Zimmet Kaydı</Button>
        </div>

        <div className="card" style={{ padding: '1rem', marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
             <Input placeholder="Personel veya demirbaş ara..." icon={<Search size={18} />} />
             <Button variant="outline"><Filter size={18} /> Filtrele</Button>
        </div>

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: 'var(--background)' }}>
              <tr>
                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.75rem', color: 'var(--muted)' }}>DEMİRBAŞ</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.75rem', color: 'var(--muted)' }}>SORUMLU</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.75rem', color: 'var(--muted)' }}>TARİH</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.75rem', color: 'var(--muted)' }}>DURUM</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}></th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{item.asset}</td>
                  <td style={{ padding: '1rem' }}>{item.user}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{item.date}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '100px', backgroundColor: item.status === 'Aktif' ? '#ECFDF5' : '#FEF3C7', color: item.status === 'Aktif' ? '#065F46' : '#92400E', fontWeight: 600 }}>
                      {item.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <Button variant="ghost" size="sm"><ArrowRight size={16} /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AddAssignmentModal 
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
}
