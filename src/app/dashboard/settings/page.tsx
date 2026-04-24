'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Settings, User, Bell, Shield, Key, Database, RefreshCw, ExternalLink, Check, Plus } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import styles from './Settings.module.css';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1500);
  };

  return (
    <DashboardLayout>
      <div className="fade-in">
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Ayarlar</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>Sistem ve kullanıcı tercihlerini yapılandırın.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 1fr) 3fr', gap: '2rem' }}>
          <div className="card" style={{ height: 'fit-content', padding: '1rem', position: 'sticky', top: '2rem' }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <Button 
                variant={activeTab === 'profile' ? 'primary' : 'ghost'} 
                style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
                onClick={() => setActiveTab('profile')}
              >
                <User size={18} /> Profil
              </Button>
              <Button 
                variant={activeTab === 'integration' ? 'primary' : 'ghost'} 
                style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
                onClick={() => setActiveTab('integration')}
              >
                <Database size={18} /> Entegrasyonlar
              </Button>
              <Button 
                variant={activeTab === 'users' ? 'primary' : 'ghost'} 
                style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
                onClick={() => setActiveTab('users')}
              >
                <User size={18} /> Kullanıcı Yönetimi
              </Button>
              <Button 
                variant={activeTab === 'security' ? 'primary' : 'ghost'} 
                style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
                onClick={() => setActiveTab('security')}
              >
                <Shield size={18} /> Güvenlik
              </Button>
            </nav>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            {activeTab === 'profile' && (
              <div className="fade-in">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Profil Bilgileri</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <Input label="Ad Soyad" defaultValue="Admin User" />
                  <Input label="E-posta" defaultValue="admin@yesilay.org.tr" />
                  <Button style={{ alignSelf: 'flex-start' }}>Güncelle</Button>
                </div>
              </div>
            )}

            {activeTab === 'integration' && (
              <div className="fade-in">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Google Sheets Entegrasyonu</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Verileriniz otomatik olarak Yeşilay merkezi e-tablosuna aktarılır.</p>
                
                <div className={styles.integrationBox}>
                    <div className={styles.integrationHeader}>
                        <div className={styles.integrationInfo}>
                            <div className={styles.sheetsIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#0F9D58"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM7 11h10v2H7v-2zm0 4h10v2H7v-2z"/></svg>
                            </div>
                            <div>
                                <p className={styles.integrationTitle}>Yeşilay DBYS - Merkezi Envanter</p>
                                <p className={styles.integrationStatus}>
                                    <span style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                                        <div className={styles.pulseDot} /> Aktif ve Bağlı
                                    </span>
                                </p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => window.open('https://docs.google.com/spreadsheets', '_blank')}>
                            <ExternalLink size={16} /> Tabloyu Aç
                        </Button>
                    </div>

                    <div className={styles.integrationDetails}>
                        <div className={styles.detailRow}>
                            <span>Bağlı E-Tablo ID:</span>
                            <code>1xQw...98Az</code>
                        </div>
                        <div className={styles.detailRow}>
                            <span>Otomatik Senkronizasyon:</span>
                            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>AÇIK</span>
                        </div>
                    </div>

                    <div className={styles.integrationActions}>
                        <div className={styles.syncStatus}>
                            <p>Son Güncelleme: Az önce</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Şu an tüm veriler güncel.</p>
                        </div>
                        <Button variant="primary" size="sm" onClick={handleSync} disabled={isSyncing}>
                            <RefreshCw size={16} className={isSyncing ? 'spin' : ''} /> 
                            {isSyncing ? 'Eşitleniyor...' : 'Şimdi Eşitle'}
                        </Button>
                    </div>
                </div>

                <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'var(--background)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>E-Tablo Kuralları</p>
                    <ul style={{ fontSize: '0.8125rem', color: 'var(--muted)', listStyle: 'disc', paddingLeft: '1.25rem' }}>
                        <li>Yeni demirbaşlar eklendiğinde otomatik olarak satır eklenir.</li>
                        <li>Durum değişiklikleri (Zimmetli/Arızalı) anlık yansıtılır.</li>
                        <li>Yedekleme her 24 saatte bir otomatik yapılır.</li>
                    </ul>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="fade-in">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Kullanıcı Yönetimi</h3>
                    <Button size="sm"><Plus size={16} /> Yeni Kullanıcı</Button>
                </div>

                <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--border)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                        <thead style={{ backgroundColor: 'var(--background)' }}>
                            <tr>
                                <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--border)' }}>Kullanıcı</th>
                                <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--border)' }}>Rol</th>
                                <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--border)' }}>Birim</th>
                                <th style={{ textAlign: 'center', padding: '1rem', borderBottom: '1px solid var(--border)' }}>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ fontWeight: 600 }}>Admin User</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>admin@yesilay.org.tr</div>
                                </td>
                                <td style={{ padding: '1rem' }}><span style={{ padding: '2px 8px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>SÜPER ADMİN</span></td>
                                <td style={{ padding: '1rem' }}>Genel Merkez</td>
                                <td style={{ padding: '1rem', textAlign: 'center' }}><Button variant="ghost" size="sm">Düzenle</Button></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ fontWeight: 600 }}>Mehmet Yılmaz</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>m.yilmaz@yedam.org.tr</div>
                                </td>
                                <td style={{ padding: '1rem' }}><span style={{ padding: '2px 8px', backgroundColor: '#FEF3C7', color: '#D97706', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>EDİTÖR</span></td>
                                <td style={{ padding: '1rem' }}>Üsküdar YEDAM</td>
                                <td style={{ padding: '1rem', textAlign: 'center' }}><Button variant="ghost" size="sm">Düzenle</Button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="card" style={{ marginTop: '2rem', padding: '1.5rem', border: '1px dashed var(--primary)' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Hızlı Kullanıcı Tanımla</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <Input label="Kullanıcı Adı" placeholder="kullanici.adi" />
                        <Input label="E-posta" placeholder="ornek@yesilay.org.tr" />
                        <Input label="Şifre" type="password" placeholder="********" />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Birim Rolü</label>
                            <select style={{ padding: '0.6rem', border: '1px solid var(--border)', borderRadius: '8px', backgroundColor: 'var(--card)' }}>
                                <option>Görüntüleyici (Sadece İzleme)</option>
                                <option>Editör (Kayıt Ekleme/Düzeltme)</option>
                                <option>Yönetici (Birim Yetkilisi)</option>
                            </select>
                        </div>
                    </div>
                    <Button variant="primary">Kullanıcıyı Kaydet</Button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="fade-in">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Güvenlik Ayarları</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                   <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
                     <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Şifre Değiştir</p>
                     <p style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>En az 8 karakter, harf ve rakam içeren şifre kullanın.</p>
                     <Button variant="outline" size="sm" style={{ marginTop: '1rem' }}><Key size={16} /> Şifre Güncelle</Button>
                   </div>
                   <div>
                     <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>İki Faktörlü Doğrulama</p>
                     <Button variant="outline" size="sm" style={{ marginTop: '1rem' }}>Aktif Et</Button>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
