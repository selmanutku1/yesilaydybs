import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Grid, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';

export default function CategoriesPage() {
  const categories = [
    { name: 'Bilgisayar', count: 420 },
    { name: 'Çevre Birimleri', count: 156 },
    { name: 'Mobilya', count: 890 },
    { name: 'Elektronik', count: 64 },
    { name: 'Diğer', count: 12 },
  ];

  return (
    <DashboardLayout>
      <div className="fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Kategoriler</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>Demirbaş sınıflandırmalarını yönetin.</p>
          </div>
          <Button><Plus size={20} /> Yeni Kategori Ekle</Button>
        </div>

        <div className="card" style={{ padding: '1rem', marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
             <Input placeholder="Kategori ara..." icon={<Search size={18} />} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {categories.map((cat) => (
            <div key={cat.name} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>{cat.name}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>{cat.count} Demirbaş</p>
              </div>
              <Button variant="ghost" size="sm"><Grid size={18} /></Button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
