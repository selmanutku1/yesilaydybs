import DashboardLayout from '@/components/layout/DashboardLayout';
import { BarChart3, Download, TrendingUp, PieChart, Activity } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Raporlar</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>Envanter ve bakım verilerini analiz edin.</p>
          </div>
          <Button variant="outline"><Download size={20} /> Tümünü İndir</Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <TrendingUp size={18} color="var(--primary)" /> Demirbaş Artış Hızı
            </h3>
            <div style={{ height: '150px', backgroundColor: 'var(--background)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: '0.875rem' }}>
              Grafik Görüntüleniyor...
            </div>
          </div>
          
          <div className="card">
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <PieChart size={18} color="var(--primary)" /> Durum Dağılımı
            </h3>
            <div style={{ height: '150px', backgroundColor: 'var(--background)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: '0.875rem' }}>
              Grafik Görüntüleniyor...
            </div>
          </div>
          
          <div className="card">
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Activity size={18} color="var(--primary)" /> Bakım Maliyetleri
            </h3>
            <div style={{ height: '150px', backgroundColor: 'var(--background)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: '0.875rem' }}>
              Grafik Görüntüleniyor...
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Envanter Özeti</h3>
          <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>Son 30 gün verilerine göre genel rapor.</p>
          <Button style={{ width: '100%' }}>Detaylı PDF Raporu Oluştur</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
